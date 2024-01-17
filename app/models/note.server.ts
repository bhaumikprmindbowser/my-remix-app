import type { Note } from "@prisma/client";

import { prisma } from "~/db.server";

export function createNote({ title, content }: Note) {
  return prisma.note.create({
    data: {
      title,
      content,
    },
  });
}

export function getNotes() {
  return prisma.note.findMany();
}

export function getNote(noteId: string) {
  return prisma.note.findFirst({ where: { id: noteId } });
}

export function deleteNote(noteId: string) {
  return prisma.note.delete({ where: { id: noteId } });
}
