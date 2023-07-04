import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

const user = {
  id: 1,
  name: "Alessandro",
  image: "https://github.com/lifeisfoo.png",
};

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar user={user} />
        <Main />
      </div>
    </div>
  );
}
