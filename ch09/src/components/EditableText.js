import { useState } from "react";

export default function EditableText({ initialText, onEditEnd, className }) {
  const [editableText, setEditableText] = useState(initialText);

  return (
    <input
      type="text"
      className={className}
      value={editableText}
      onChange={(event) => setEditableText(event.target.value)}
      onBlur={() => {
        if (editableText !== initialText) {
          onEditEnd(editableText);
        }
      }}
    />
  );
}
