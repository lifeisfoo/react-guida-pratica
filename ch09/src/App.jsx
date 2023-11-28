import { useState } from "react";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import ListNames from "./components/ListNames";
import User from "./components/User";
import { v4 as uuid } from "uuid";
import { NoListView } from "./components/NoListView";
import ListView from "./components/ListView";
import { NewListButton } from "./components/NewListButton";

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

  const addToListCount = (listIdx, num) => {
    const tmpLists = [...allLists];
    tmpLists[listIdx] = { ...tmpLists[listIdx] };
    tmpLists[listIdx].undone_count += num;
    setAllLists(tmpLists);
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

    addToListCount(listIdx, 1);
  };

  const handleUpdateTodo = (id, data) => {
    const todoIdx = allTodos.findIndex((t) => t.id === id);
    const preTodo = allTodos[todoIdx];
    const updatedTodo = {
      ...preTodo,
      ...data,
    };

    const tmpTodos = [...allTodos];
    tmpTodos[todoIdx] = updatedTodo;
    setAllTodos(tmpTodos);
    setTodos(tmpTodos.filter((t) => t.listId === updatedTodo.listId));

    const isTodoStatusChanged = preTodo.done !== updatedTodo.done;
    if (isTodoStatusChanged) {
      addToListCount(listIdx, preTodo.done ? 1 : -1);
    }
  };

  const handleDeleteTodo = (id) => {
    const todoIdx = todos.findIndex((t) => t.id === id);
    const todo = todos[todoIdx];

    const tmpTodos = [...todos];
    tmpTodos.splice(todoIdx, 1);
    setTodos(tmpTodos);

    setAllTodos(allTodos.filter((t) => t.id !== id));

    addToListCount(listIdx, todo.done ? 0 : -1);
  };

  const handleCreateList = () => {
    const newList = { id: uuid(), name: "Nuovo elenco", undone_count: 0 };
    setAllLists([...allLists, newList]);
    setListIdx(allLists.length);
  };

  const handleDeleteList = (id) => {
    const listIdx = allLists.findIndex((l) => l.id === id);

    const tmpLists = [...allLists];
    tmpLists.splice(listIdx, 1);
    setAllLists(tmpLists);

    setListIdx(-1);
  };

  const handleUpdateListName = (id, name) => {
    const listIdx = allLists.findIndex((l) => l.id === id);

    const tmpLists = [...allLists];
    tmpLists[listIdx].name = name;
    setAllLists(tmpLists);
  };

  return (
    <Layout>
      <LeftCol>
        <User name={user.name} image={user.image}>
          <NewListButton onCreateList={handleCreateList} />
        </User>
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
          <ListView
            list={allLists[listIdx]}
            todos={todos}
            onTodoCreate={handleCreateTodo}
            onTodoDelete={handleDeleteTodo}
            onTodoUpdate={handleUpdateTodo}
            onListDelete={handleDeleteList}
            onListNameUpdate={handleUpdateListName}
          />
        )}
      </RightCol>
    </Layout>
  );
}
