import Col from "./Col";
import ListNames from "./ListNames";
import User from "./User";

const customStyle = {
  boxShadow: "inset -1px 0 0 rgba(0, 0, 0, 0.1)",
};

export default function Sidebar({ user }) {
  return (
    <Col size={3} className="bg-light" style={customStyle}>
      <User name={user.name} image={user.image} />
      <hr />
      <ListNames />
    </Col>
  );
}
