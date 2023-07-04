import TodoItem from "./TodoItem";

export default function TodoList({ todos, onTodoUpdate, onTodoDelete }) {
  const todoItems = todos.map((t) => (
    <TodoItem
      key={t.id}
      id={t.id}
      done={t.done}
      text={t.text}
      updateTodo={onTodoUpdate}
      deleteTodo={onTodoDelete}
    />
  ));
  return <ul className="list-group pb-3">{todoItems}</ul>;
}
