import { useEffect, useState } from "react";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import ListNames from "./components/ListNames";
import User from "./components/User";
import { NoListView } from "./components/NoListView";
import ListView from "./components/ListView";
import { NewListButton } from "./components/NewListButton";
import { deleteData, getData, patchData, postData } from "./utils";
import ReactModal from "react-modal";
import ErrorModal from "./components/ErrorModal";

export default function App() {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [listIdx, setListIdx] = useState(-1);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData("/api/user").then((retUser) => setUser(retUser));
    getData("/api/lists").then((retLists) => setLists(retLists));
  }, []);

  const selectListByIdx = (idx) => {
    setListIdx(idx);
    const listId = lists[idx].id;
    getData(`/api/todos?listId=${listId}`).then((retTodos) => {
      setTodos(retTodos);
    });
  };

  const addToListCount = (listIdx, num) => {
    const tmpLists = [...lists];
    tmpLists[listIdx] = { ...tmpLists[listIdx] };
    tmpLists[listIdx].undone_count += num;
    setLists(tmpLists);
  };

  const handleCreateTodo = (text) => {
    const listId = lists[listIdx].id;
    postData(`/api/todos`, { listId, text, done: false })
      .then((newTodo) => {
        setTodos([newTodo, ...todos]);
        addToListCount(listIdx, 1);
      })
      .catch((e) =>
        setError(`Errore durante la creazione dell'attività: ${e.status}`)
      );
  };

  const handleUpdateTodo = (id, data) => {
    const todoIdx = todos.findIndex((t) => t.id === id);
    const preTodo = todos[todoIdx];
    patchData(`/api/todos/${id}`, data).then((patchedTodo) => {
      const tmpTodos = [...todos];
      tmpTodos[todoIdx] = patchedTodo;
      setTodos(tmpTodos.filter((t) => t.listId === patchedTodo.listId));

      const isTodoStatusChanged = preTodo.done !== patchedTodo.done;
      if (isTodoStatusChanged) {
        const listIdx = lists.findIndex((l) => l.id === patchedTodo.listId);
        addToListCount(listIdx, preTodo.done ? 1 : -1);
      }
    });
  };

  const handleDeleteTodo = (id) => {
    deleteData(`/api/todos/${id}`).then((deletedTodo) => {
      const todoIdx = todos.findIndex((t) => t.id === id);
      const todo = todos[todoIdx];

      const tmpTodos = [...todos];
      tmpTodos.splice(todoIdx, 1);
      setTodos(tmpTodos);

      addToListCount(listIdx, todo.done ? 0 : -1);
    });
  };

  const handleCreateList = () => {
    postData("/api/lists", { name: "Nuovo elenco" }).then((newList) => {
      setLists([...lists, newList]);
      setListIdx(lists.length);
      setTodos([]);
    });
  };

  const handleDeleteList = (id) => {
    deleteData(`/api/lists/${id}`).then((deletedList) => {
      const listIdx = lists.findIndex((l) => l.id === id);

      const tmpLists = [...lists];
      tmpLists.splice(listIdx, 1);
      setLists(tmpLists);

      setListIdx(-1);
    });
  };

  const handleUpdateListName = (id, name) => {
    patchData(`/api/lists/${id}`, { name }).then((patchedList) => {
      const listIdx = lists.findIndex((l) => l.id === id);
      const tmpLists = [...lists];
      tmpLists[listIdx] = patchedList;
      setLists(tmpLists);
    });
  };

  return (
    <>
      <ReactModal isOpen={Boolean(error)}>
        <ErrorModal message={error} onConfirm={() => setError(false)} />
      </ReactModal>
      <Layout>
        <LeftCol>
          <User name={user.name} image={user.image}>
            <NewListButton onCreateList={handleCreateList} />
          </User>
          <hr />
          <ListNames
            lists={lists}
            selectedListIdx={listIdx}
            onListClick={selectListByIdx}
          />
        </LeftCol>
        <RightCol>
          {listIdx === -1 ? (
            <NoListView />
          ) : (
            <ListView
              list={lists[listIdx]}
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
    </>
  );
}
