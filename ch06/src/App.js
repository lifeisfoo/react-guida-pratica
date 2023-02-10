import { useState } from "react";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import ListNames from "./components/ListNames";
import TodoList from "./components/TodoList";
import User from "./components/User";

const user = {
  id: 1,
  name: "Alessandro",
  image: "https://github.com/lifeisfoo.png",
};

const lists = [
  { id: 1, name: "Importante", undone_count: 0 },
  { id: 2, name: "Film da vedere", undone_count: 2 },
  { id: 3, name: "Libri da leggere", undone_count: 0 },
];

const allTodos = [
  { listId: 2, id: 1, done: false, text: "Prima attività" },
  { listId: 2, id: 2, done: true, text: "Seconda attività" },
  { listId: 2, id: 3, done: false, text: "Terza attività" },
];

export default function App() {
  const [listIdx, setListIdx] = useState(-1);
  const [todos, setTodos] = useState([]);

  const selectListByIdx = (idx) => {
    setListIdx(idx);
    setTodos(allTodos.filter((t) => t.listId === lists[idx].id));
  };

  return (
    <Layout>
      <LeftCol>
        <User name={user.name} image={user.image} />
        <hr />
        <ListNames
          lists={lists}
          selectedListIdx={listIdx}
          onListClick={selectListByIdx}
        />
      </LeftCol>
      <RightCol>
        <TodoList todos={todos} />
      </RightCol>
    </Layout>
  );
}
