export default function StatusCheckbox({ done, onChange }) {
  return (
    <input
      className="form-check-input mx-1 my-0"
      type="checkbox"
      checked={done}
      onChange={onChange}
    />
  );
}
