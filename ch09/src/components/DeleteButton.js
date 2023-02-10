import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-sm btn-outline-secondary mx-1 py-0 opacity-25 border-0"
    >
      <TrashIcon />
    </button>
  );
}
