-- Serendipity Wellness booking system — database schema.
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth user, carries role + contact details.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Role helpers (security definer so RLS policies can consult them without
-- recursing into profiles' own policies).
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.my_role()
returns text
language sql
security definer set search_path = ''
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- Class schedule: the weekly timetable, managed by admins.
-- ---------------------------------------------------------------------------
create table public.class_schedule (
  id uuid primary key default gen_random_uuid(),
  class_name text not null,
  level text check (level in ('Beginner', 'Intermediate')),
  day text not null check (
    day in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
  ),
  time text not null check (time ~ '^[0-2][0-9]:[0-5][0-9]$'),
  description text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Bookings.
-- ---------------------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  class_name text not null,
  day text not null,
  time text not null,
  class_date date,
  status text not null default 'booked' check (status in ('booked', 'cancelled')),
  is_recurring boolean not null default false,
  created_at timestamptz not null default now()
);

-- One active booking per user per class occurrence.
create unique index bookings_unique_active
  on public.bookings (user_id, class_name, day, time, class_date)
  where status = 'booked';

create index bookings_user_idx on public.bookings (user_id, status);
create index bookings_class_idx on public.bookings (class_name, day, time, status);

-- ---------------------------------------------------------------------------
-- Row-level security.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.class_schedule enable row level security;
alter table public.bookings enable row level security;

-- Profiles: users see and edit their own (but cannot change their role);
-- admins see and edit everyone.
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid() or public.is_admin())
  with check (
    public.is_admin()
    or (id = auth.uid() and role = public.my_role())
  );

-- Class schedule: public read (the timetable is the public landing page);
-- admin-only writes.
create policy "schedule_select_all" on public.class_schedule
  for select using (true);

create policy "schedule_admin_insert" on public.class_schedule
  for insert with check (public.is_admin());

create policy "schedule_admin_update" on public.class_schedule
  for update using (public.is_admin());

create policy "schedule_admin_delete" on public.class_schedule
  for delete using (public.is_admin());

-- Bookings: users manage their own; admins see and manage all.
create policy "bookings_select_own" on public.bookings
  for select using (user_id = auth.uid() or public.is_admin());

create policy "bookings_insert_own" on public.bookings
  for insert with check (user_id = auth.uid());

create policy "bookings_update_own" on public.bookings
  for update using (user_id = auth.uid() or public.is_admin());
