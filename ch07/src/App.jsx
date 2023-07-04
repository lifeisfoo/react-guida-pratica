import { useState } from "react";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import ListNames from "./components/ListNames";
import TodoCreator from "./components/TodoCreator";
import TodoList from "./components/TodoList";
import User from "./components/User";
import { v4 as uuid } from "uuid";
import { NoListView } from "./components/NoListView";

const user = {
  id: 1,
  name: "Alessandro",
  image: "https://github.com/lifeisfoo.png",
};

const initialLists = [
  { id: 1, name: "Importante", undone_count: 0 },
  { id: 2, name: "Film da vedere", undone_count: 2 },
  { id: 3, name: "Libri da leggere", undone_count: 0 },
];

const initialTodos = [
  { listId: 2, id: 1, done: false, text: "Prima attività" },
  { listId: 2, id: 2, done: true, text: "Seconda attività" },
  { listId: 2, id: 3, done: false, text: "Terza attività" },
];

export default function App() {
  const [allLists, setAllLists] = useState(initialLists);
  const [allTodos, setAllTodos] = useState(initialTodos);
  const [listIdx, setListIdx] = useState(-1);
  const [todos, setTodos] = useState([]);

  const selectListByIdx = (idx) => {
    setListIdx(idx);
    setTodos(allTodos.filter((t) => t.listId === allLists[idx].id));
  };

  const handleCreateTodo = (text) => {
    const newTodo = {
      listId: allLists[listIdx].id,
      id: uuid(),
      done: false,
      text: text,
    };
    setAllTodos([...allTodos, newTodo]);
    setTodos([...todos, newTodo]);

    const tmpLists = [...allLists];
    tmpLists[listIdx].undone_count++;
    setAllLists(tmpLists);
  };

  return (
    <Layout>
      <LeftCol>
        <User name={user.name} image={user.image} />
        <hr />
        <ListNames
          lists={allLists}
          selectedListIdx={listIdx}
          onListClick={selectListByIdx}
        />
      </LeftCol>
      <RightCol>
        {listIdx === -1 ? (
          <NoListView />
        ) : (
          <>
            <TodoList todos={todos} />
            <TodoCreator onCreate={handleCreateTodo} />
          </>
        )}
      </RightCol>
    </Layout>
  );
}
