import { useState } from "react";
import DeleteButton from "./DeleteButton";
import InlineDeleteModal from "./InlineDeleteModal";
import StatusCheckbox from "./StatusCheckbox";
import TodoText from "./TodoText";

const todoClasses =
  "d-flex align-items-center list-group-item my-1 border rounded-1";

export default function TodoItem({ id, done, text, updateTodo, deleteTodo }) {
  const [delModal, setDelModal] = useState(false);

  return (
    <li className={todoClasses}>
      <StatusCheckbox
        done={done}
        onChange={() => updateTodo(id, { done: !done })}
      />
      <TodoText
        done={done}
        text={text}
        onChange={(newText) => updateTodo(id, { text: newText })}
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
