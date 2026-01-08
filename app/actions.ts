'use server';

import { getAuthSession } from "../app/lib/auth";
import { prisma } from "../app/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const GuestbookSchema = z.object({
  message: z.string().min(1).max(500),
});

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    throw new Error("Você precisa estar logado.");
  }

  const entry = formData.get('message');
  const result = GuestbookSchema.safeParse({ message: entry });

  if (!result.success) {
    throw new Error("Mensagem inválida.");
  }

  await prisma.guestbookEntry.create({
    data: {
      message: result.data.message,
      userId: session.user.id,
    }
  });

  revalidatePath('/guestbook');
  revalidatePath('/');
}