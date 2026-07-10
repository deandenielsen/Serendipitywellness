"use client";

import { useState, useTransition } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { updatePassword, updateProfile } from "@/lib/actions/auth";

interface AccountFormProps {
  email: string;
  fullName: string;
  phone: string;
}

function AccountForm(props: AccountFormProps) {
  const [fullName, setFullName] = useState(props.fullName);
  const [phone, setPhone] = useState(props.phone);
  const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [profilePending, startProfile] = useTransition();

  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [passwordPending, startPassword] = useTransition();

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    startProfile(async () => {
      const result = await updateProfile({ fullName, phone });
      setProfileMsg(
        result.ok
          ? { ok: true, text: "Details saved." }
          : { ok: false, text: result.error }
      );
    });
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    startPassword(async () => {
      const result = await updatePassword(password);
      if (result.ok) {
        setPassword("");
        setPasswordMsg({ ok: true, text: "Password updated." });
      } else {
        setPasswordMsg({ ok: false, text: result.error });
      }
    });
  };

  const Message = ({ msg }: { msg: { ok: boolean; text: string } }) => (
    <p
      className={
        msg.ok
          ? "flex items-center gap-2 rounded-app bg-secondary/50 px-4 py-3 text-small text-copy"
          : "rounded-app bg-danger/10 px-4 py-3 text-small text-danger"
      }
    >
      {msg.ok && <CheckCircle size={16} className="text-primary-strong" />}
      {msg.text}
    </p>
  );

  return (
    <div className="space-y-8">
      <form
        onSubmit={saveProfile}
        className="space-y-4 rounded-app border border-secondary bg-surface p-6"
      >
        <h2 className="font-serif text-h3 font-semibold text-copy">Profile</h2>
        <div>
          <Label htmlFor="account-email">Email</Label>
          <Input id="account-email" value={props.email} disabled />
        </div>
        <div>
          <Label htmlFor="account-name">Full name</Label>
          <Input
            id="account-name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="account-phone">Phone number</Label>
          <Input
            id="account-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {profileMsg && <Message msg={profileMsg} />}
        <Button type="submit" disabled={profilePending}>
          {profilePending ? "Saving…" : "Save details"}
        </Button>
      </form>

      <form
        onSubmit={savePassword}
        className="space-y-4 rounded-app border border-secondary bg-surface p-6"
      >
        <h2 className="font-serif text-h3 font-semibold text-copy">Change password</h2>
        <div>
          <Label htmlFor="account-password">New password</Label>
          <Input
            id="account-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {passwordMsg && <Message msg={passwordMsg} />}
        <Button type="submit" variant="ghost" disabled={passwordPending}>
          {passwordPending ? "Updating…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}

export { AccountForm };
