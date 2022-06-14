import { Container, Nav, Navbar, NavDropdown,Image } from "react-bootstrap";

export default function NavReact() {
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
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
