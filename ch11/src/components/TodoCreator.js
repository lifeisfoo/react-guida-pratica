import { useState } from "react";
import { ReactComponent as PlusLargeIcon } from "bootstrap-icons/icons/plus-lg.svg";

export default function TodoCreator({ onCreate }) {
  const [text, setText] = useState("");

  return (
    <div
      style={{ width: "70%" }} // required by position absolute...
      className="position-absolute bottom-0 bg-light p-3 rounded d-flex align-items-center"
    >
      <PlusLargeIcon />{" "}
      <input
        type="text"
        className="bg-light border-0 flex-grow-1 mx-2 py-1"
        placeholder="Aggiungi un'attività"
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            if (text.trim().length > 0) {
              onCreate(text);
              setText("");
            }
          }
        }}
      />
    </div>
  );
}
