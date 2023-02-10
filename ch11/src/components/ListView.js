import { useState } from "react";
import DeleteButton from "./DeleteButton";
import ListDeleteModal from "./ListDeleteModal";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";
import ReactModal from "react-modal";
import EditableText from "./EditableText";

export default function ListView({
  list,
  todos,
  onTodoUpdate,
  onTodoDelete,
  onTodoCreate,
  onListDelete,
  onListNameUpdate,
}) {
  const [delModal, setDelModal] = useState(false);

  const notCompleted = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <>
      <div className="d-flex align-items-center position-relative">
        <EditableText
          className="h2 flex-grow-1 border-0 mx-2 py-1"
          initialText={list.name}
          onEditEnd={(name) => onListNameUpdate(list.id, name)}
          key={list.id}
        />
        <DeleteButton onClick={() => setDelModal(true)} />
      </div>
      <ReactModal isOpen={delModal}>
        <ListDeleteModal
          message={`Vuoi eliminare l'elenco "${list.name}" con ${todos.length} attività?`}
          onDelete={() => onListDelete(list.id)}
          onCancel={() => setDelModal(false)}
        />
      </ReactModal>

      <TodoList
        todos={notCompleted}
        onTodoUpdate={onTodoUpdate}
        onTodoDelete={onTodoDelete}
      />
      {completed.length > 0 && (
        <>
          <h6>Completate</h6>
          <TodoList
            todos={completed}
            onTodoUpdate={onTodoUpdate}
            onTodoDelete={onTodoDelete}
          />
        </>
      )}
      <TodoCreator onCreate={onTodoCreate} />
    </>
  );
}
