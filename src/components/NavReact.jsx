import { Container, Nav, Navbar,Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavReact({favorites}) {
  return (
      <div>
        <Navbar className="nav" bg="dark" variant="dark">
      <Container>
          <Navbar.Brand href="/">
          <Image
              className="logo-navbar"
              src="https://res.cloudinary.com/dtbfspso5/image/upload/v1651778966/rick%20and%20morty/Rick-And-Morty-Logo_rdwvrn.png"
              fluid
              alt="Logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link as={Link} to="/Favorites">
              Favorites:<span>({favorites.length})</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
