'use client';

import { saveGuestbookEntry } from "@/app/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { SignOutButton } from "../ui/SignOutButton";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition-all"
    >
      {pending ? 'Enviando...' : 'Assinar Guestbook'}
    </button>
  );
}

export function GuestbookForm({ user }: { user: any }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3"
    >
      <input
        name="message"
        required
        placeholder={`Deixe uma mensagem como ${user.name}...`}
        className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-xs sm:placeholder:text-sm"
        maxLength={500}
      />
      <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Logado como <b>{user.name}</b></span>
            <SignOutButton />
    </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}