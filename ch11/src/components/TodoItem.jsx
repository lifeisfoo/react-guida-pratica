import { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditableText from "./EditableText";
import InlineDeleteModal from "./InlineDeleteModal";
import StatusCheckbox from "./StatusCheckbox";

const todoClasses =
  "d-flex align-items-center list-group-item my-1 border rounded-1";
const getTextClasses = (done) =>
  `mx-1 my-0 ps-3 flex-grow-1 border-0 ${
    done ? "text-decoration-line-through text-black-50" : ""
  }`;
export default function TodoItem({ id, done, text, updateTodo, deleteTodo }) {
  const [delModal, setDelModal] = useState(false);

  return (
    <li className={todoClasses}>
      <StatusCheckbox
        done={done}
        onChange={() => updateTodo(id, { done: !done })}
      />
      <EditableText
        className={getTextClasses(done)}
        initialText={text}
        onEditEnd={(newText) => updateTodo(id, { text: newText })}
      />
      <DeleteButton onClick={() => setDelModal(true)} />

      {delModal && (
        <InlineDeleteModal
          onDelete={() => deleteTodo(id)}
          onCancel={() => setDelModal(false)}
        />
      )}
    </li>
  );
}
