import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getNote } from "~/models/note.server";

import styles from "~/styles/note-details.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.title },
    { name: "description", content: "Manage your notes with ease." },
  ];
};

export default function NoteDetailsPage() {
  const note = useLoaderData<typeof loader>();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.noteId, "noteId not found");

  const noteId = params.noteId;
  const note = await getNote(noteId);

  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  return note;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
