function Col({ children, size = "", className = "", style }) {
  const classes = `col${size ? `-${size}` : ""} ${className}`;
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

function Container({ fluid, children, className }) {
  const classes = `container${fluid ? "-fluid" : ""} ${
    className ? className : ""
  }`;
  return <div className={classes}>{children}</div>;
}

function Row({ children, className }) {
  const classes = `row ${className ? className : ""}`;
  return <div className={classes}>{children}</div>;
}

export default function Layout({ children }) {
  return (
    <Container fluid={true}>
      <Row>{children}</Row>
    </Container>
  );
}

export function LeftCol({ children }) {
  return (
    <Col
      size="3"
      className="bg-light p-3 overflow-scroll vh-100"
      style={{
        boxShadow: "inset -1px 0 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </Col>
  );
}
export function RightCol({ children }) {
  return (
    <Col size="9" className="p-3 overflow-scroll vh-100">
      {children}
    </Col>
  );
}
