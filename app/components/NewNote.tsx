import { useRef, useEffect } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import styles from "./NewNote.css";
import { action } from "~/routes/notes";

function NewNote() {
  const form = useRef<HTMLFormElement>(null);
  const data = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      form.current?.reset();
    }
  }, [isSubmitting]);

  return (
    <Form method="post" id="note-form" ref={form}>
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
