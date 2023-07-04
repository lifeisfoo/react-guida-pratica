import { ReactComponent as ListIcon } from "bootstrap-icons/icons/list-ul.svg";

const navLinkStyle = { cursor: "pointer" };

function ListItem({ isSelected, name, count }) {
  const textColor = isSelected ? "text-white" : "text-black";
  return (
    <li
      className={`nav-link d-flex align-items-center ${
        isSelected ? "active" : ""
      }`}
      style={navLinkStyle}
    >
      <ListIcon /> <span className={`${textColor} ms-2`}>{name}</span>
      <small className={`${textColor} fw-lighter ms-auto`}>{count}</small>
    </li>
  );
}

export default function ListNames({ lists, selectedListIdx }) {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      {lists.map((t, idx) => {
        return (
          <ListItem
            key={t.id}
            isSelected={selectedListIdx === idx}
            name={t.name}
            count={t.undone_count}
          />
        );
      })}
    </ul>
  );
}
