import Layout, { LeftCol, RightCol } from "./components/Layout";
import ListNames from "./components/ListNames";
//import Main from "./components/Main";
//import Sidebar from "./components/Sidebar";
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

const todos = [
  { listId: 2, id: 1, done: false, text: "Prima attività" },
  { listId: 2, id: 2, done: true, text: "Seconda attività" },
  { listId: 2, id: 3, done: false, text: "Terza attività" },
];

//export default function App() {
//  return (
//    <div className="container-fluid">
//      <div className="row">
//        <Sidebar user={user} />
//        <Main />
//      </div>
//    </div>
//  );
//}

export default function App() {
  return (
    <Layout>
      <LeftCol>
        <User name={user.name} image={user.image} />
        <hr />
        <ListNames lists={lists} selectedListIdx={1} />
      </LeftCol>
      <RightCol>
        <TodoList todos={todos} />
      </RightCol>
    </Layout>
  );
}
