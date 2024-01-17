import { Link, useFetcher } from "@remix-run/react";

import styles from "./NoteList.css";
import { Note } from "~/types";

function NoteList({ notes }: { notes: Note[] }) {
  const fetcher = useFetcher();
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <Link to={note.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li style={{ display: "flex", gap: "10px" }}>
                    <time dateTime={note.id}>
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                    <button
                      value={note.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        fetcher.submit(
                          { id: note.id },
                          {
                            method: "DELETE",
                          }
                        );
                      }}
                    >
                      🌱
                    </button>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p className="">{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
