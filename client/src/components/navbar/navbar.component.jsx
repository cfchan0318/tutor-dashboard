import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

function AppNavbar() {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Tutor</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#students">Students</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
