import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";

export default function ListView({
  listName,
  todos,
  onTodoUpdate,
  onTodoDelete,
  onTodoCreate,
}) {
  const notCompleted = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <>
      <h2>{listName}</h2>
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
