import { useState } from "react";

export default function ListName({ text, onChange }) {
  const [editableText, setEditableText] = useState(text);

  return (
    <input
      className="h2 flex-grow-1 border-0 mx-2 py-1"
      type="text"
      value={editableText}
      onChange={(event) => setEditableText(event.target.value)}
      onBlur={() => onChange(editableText)}
    />
  );
}
