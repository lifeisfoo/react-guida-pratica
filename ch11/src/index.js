import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import ReactModal from "react-modal";

const rootId = "root";

ReactModal.setAppElement(`#${rootId}`);
ReactModal.defaultStyles.content.background = "none";
ReactModal.defaultStyles.content.border = "none";

const root = ReactDOM.createRoot(document.getElementById(rootId));
root.render(<App />);
