import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const lists = [
  { id: 1, name: "Importante" },
  { id: 2, name: "Film da vedere" },
  { id: 3, name: "Libri da leggere" },
];

function App() {
  const [listIdx, setListIdx] = useState(1);
  return (
    <ul className="nav nav-pills flex-column">
      {lists.map((t, idx) => {
        return (
          <li
            className={`nav-link ${listIdx === idx ? "active" : ""}`}
            key={t.id}
            onClick={() => setListIdx(idx)}
          >
            {t.name}
          </li>
        );
      })}
    </ul>
  );
}

root.render(<App />);
