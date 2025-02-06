import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const courses = [
  { id: "1234", title: "CS1234 React JS", desc: "Full Stack Software Developer", img: "/images/reactjs.jpg" },
  { id: "5678", title: "CS5678 Data Structures", desc: "Advanced Algorithms & Data", img: "/images/datastructures.jpg" },
  { id: "9012", title: "CS9012 Machine Learning", desc: "AI and ML Foundations", img: "/images/machinelearning.jpg" },
  { id: "3456", title: "CS3456 Cybersecurity", desc: "Protecting Systems & Networks", img: "/images/cybersecurity.jpg" },
  { id: "7890", title: "CS7890 Databases", desc: "SQL & NoSQL Database Management", img: "/images/databases.jpg" },
  { id: "2345", title: "CS2345 Operating Systems", desc: "System Programming & Memory", img: "/images/os.jpg" },
  { id: "6789", title: "CS6789 Web Development", desc: "HTML, CSS, JavaScript", img: "/images/webdev.jpg" },
];

export default function Dashboard() {
  return (
    <Container fluid style={{ marginLeft: "160px", padding: "20px" }}> {/* ✅ Fix Clipping */}
      <h1 id="wd-dashboard-title" className="mt-3">Dashboard</h1> 
      <hr />
      <h2 id="wd-dashboard-published" className="mt-3">Published Courses ({courses.length})</h2> 
      <hr />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "20px" }}> {/* ✅ Fix Grid */}
        <Row xs={1} md={4} className="g-4">
          {courses.map((course) => (
            <Col key={course.id} style={{ minWidth: "250px", maxWidth: "270px", textAlign: "center" }}>
              <Card className="shadow-sm">
                <Link to={`/Kambaz/Courses/${course.id}/Home`} className="text-decoration-none">
                  <Card.Img variant="top" src={course.img} width="100%" height={160} />
                  <Card.Body>
                    <Card.Title className="text-dark">{course.title}</Card.Title>
                    <Card.Text className="text-muted">{course.desc}</Card.Text>
                  </Card.Body>
                </Link>
                <div className="text-center mb-3">
                  <Button as={Link} to={`/Kambaz/Courses/${course.id}/Home`} variant="primary">Go</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
