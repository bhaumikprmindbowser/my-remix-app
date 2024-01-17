import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
  MetaFunction,
} from "@remix-run/react";

import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { createNote, deleteNote, getNotes } from "~/models/note.server";

export const meta: MetaFunction = () => {
  return [
    { title: "All Notes" },
    { name: "description", content: "Manage your notes with ease." },
  ];
};

export default function NotesPage() {
  const notes = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (request.method === "DELETE") {
    const id = formData.get("id") as string;

    if (!id) return json({ message: "Invalid note id." }, { status: 400 });
    return deleteNote(id);
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { message: "Invalid title or content." };
  }

  if (title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  await createNote({
    id: Math.random().toString(36).substr(2, 9),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // throw json({ message: "email is required" }, { status: 400 });

  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <NewNote />
        <p className="info-message">{error.data.message}</p>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
