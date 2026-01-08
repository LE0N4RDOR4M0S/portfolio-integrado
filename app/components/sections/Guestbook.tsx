import { getAuthSession } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { SignInButton } from "../ui/SignInButton";
import { GuestbookForm } from "../sections/GuestbookForm";
import Image from "next/image";
import { Sparkles } from "lucide-react";

async function getEntries() {
  return await prisma.guestbookEntry.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  });
}

export async function Guestbook() {
  const session = await getAuthSession();
  const entries = await getEntries();

  return (
    <section
      id="guestbook"
      className="max-w-3xl mx-auto mt-20 px-6 py-8 border border-border/80 rounded-2xl bg-card/80 shadow-xl backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Sparkles size={18} />
          </span>
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Guestbook</h2>
            <p className="text-sm text-muted-foreground">Deixe um recado aqui.</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        {session?.user ? (
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 shadow-sm">
            <GuestbookForm user={session.user} />
          </div>
        ) : (
            <SignInButton />
        )}
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex gap-3 items-start rounded-xl border border-border/70 bg-muted/10 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-3"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/80 bg-muted/30">
              {entry.user.image && (
                <Image
                  src={entry.user.image}
                  alt={entry.user.name || "User"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-foreground">{entry.user.name}</span>
                <span className="text-[11px] px-2 py-1 rounded-full bg-accent/15 text-accent font-medium">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 break-words">
                {entry.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}