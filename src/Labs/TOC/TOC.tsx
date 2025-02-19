import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

export default function TOC() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/Labs/Lab1")}>Lab 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/Labs/Lab2")}>Lab 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/Kambaz/Dashboard")}>Kambaz</Nav.Link> {/* Now navigates to Dashboard */}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/Arssh-Bajpai" target="_blank" rel="noopener noreferrer">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
