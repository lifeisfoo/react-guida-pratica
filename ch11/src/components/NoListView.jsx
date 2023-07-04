import { ReactComponent as InfoIcon } from "bootstrap-icons/icons/info.svg";

const iconSize = "100px";

export function NoListView() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <InfoIcon
        style={{ width: iconSize, height: iconSize }}
        className="text-muted"
      />
      <p className="pt-3">Seleziona un elenco</p>
    </div>
  );
}
