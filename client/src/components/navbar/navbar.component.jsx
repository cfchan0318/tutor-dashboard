import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

function AppNavbar(props) {
  return (
    <Navbar className="px-3" sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Tutor</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <Navbar.Text>
            {props.username}
          </Navbar.Text>
          <Nav.Link eventKey={2} href="#memes">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
