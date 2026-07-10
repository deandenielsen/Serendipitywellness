-- PLACEHOLDER weekly timetable — edit freely here or later via the Admin page.
-- Run after schema.sql.

insert into public.class_schedule (class_name, level, day, time, description) values
  -- Monday
  ('Vinyasa Flow', 'Intermediate', 'Monday', '06:30', 'Breath-led flowing sequences with creative transitions and a dynamic pace. Best for students comfortable with sun salutations and standing balances.'),
  ('Hatha Yoga', 'Beginner', 'Monday', '08:00', 'Classic postures held with attention to alignment and breath. A grounding, accessible practice — ideal for newcomers.'),
  ('Restorative Yoga', null, 'Monday', '09:30', 'Slow, fully supported poses that release deep tension and calm the nervous system. Suitable for everyone.'),
  ('Vinyasa Flow', 'Beginner', 'Monday', '17:30', 'Fundamental sun salutations and alignment cues at a steady, accessible pace. Ideal for building a flowing practice from the ground up.'),
  ('Yin Yoga', null, 'Monday', '18:30', 'Long-held floor poses targeting deep connective tissue. A quiet, meditative close to the day.'),

  -- Tuesday
  ('Mat Pilates', 'Intermediate', 'Tuesday', '06:30', 'Core-focused conditioning with layered sequences and a faster pace. For students familiar with Pilates fundamentals.'),
  ('Hatha Yoga', 'Beginner', 'Tuesday', '09:30', 'Classic postures held with attention to alignment and breath. A grounding, accessible practice — ideal for newcomers.'),
  ('Vinyasa Flow', 'Intermediate', 'Tuesday', '17:30', 'Breath-led flowing sequences with creative transitions and a dynamic pace. Best for students comfortable with sun salutations and standing balances.'),

  -- Wednesday
  ('Vinyasa Flow', 'Intermediate', 'Wednesday', '06:30', 'Breath-led flowing sequences with creative transitions and a dynamic pace. Best for students comfortable with sun salutations and standing balances.'),
  ('Mat Pilates', 'Beginner', 'Wednesday', '09:30', 'Pilates fundamentals: breath, neutral spine, and controlled movement. Perfect for building core strength safely.'),
  ('Yin Yoga', null, 'Wednesday', '18:30', 'Long-held floor poses targeting deep connective tissue. A quiet, meditative close to the day.'),

  -- Thursday
  ('Hatha Yoga', 'Intermediate', 'Thursday', '06:30', 'Stronger holds, deeper variations and refined alignment work for experienced students.'),
  ('Restorative Yoga', null, 'Thursday', '09:30', 'Slow, fully supported poses that release deep tension and calm the nervous system. Suitable for everyone.'),
  ('Vinyasa Flow', 'Beginner', 'Thursday', '17:30', 'Fundamental sun salutations and alignment cues at a steady, accessible pace. Ideal for building a flowing practice from the ground up.'),

  -- Friday
  ('Vinyasa Flow', 'Intermediate', 'Friday', '06:30', 'Breath-led flowing sequences with creative transitions and a dynamic pace. Best for students comfortable with sun salutations and standing balances.'),
  ('Mat Pilates', 'Beginner', 'Friday', '09:30', 'Pilates fundamentals: breath, neutral spine, and controlled movement. Perfect for building core strength safely.'),

  -- Saturday
  ('Vinyasa Flow', null, 'Saturday', '08:00', 'An open-level weekend flow — options offered throughout so every body can find their edge.'),
  ('Restorative Yoga', null, 'Saturday', '09:30', 'Slow, fully supported poses that release deep tension and calm the nervous system. Suitable for everyone.');
