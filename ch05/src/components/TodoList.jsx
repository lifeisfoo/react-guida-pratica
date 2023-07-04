import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  const todoItems = todos.map((t) => (
    <TodoItem key={t.id} done={t.done} text={t.text} />
  ));
  return <ul className="list-group pb-3">{todoItems}</ul>;
}
