import React from "react";
import { Nav, Navbar, Container, Button, Form } from "react-bootstrap/";
import { Link } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

const NavHeader = () => {
  const { logout, auth } = useAuth();

  return (
    <>
      <Navbar expand="lg" className="bg-primary shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-white">
            KRW Engenharia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">
                <Link className="nav-link text-white" to="/home">
                  Home
                </Link>
              </Nav.Link>
              {auth.isAuthenticated && (
                <Nav.Link href="#action2">
                  <Link className="nav-link text-white" to="/dashboard/items">
                    Itens
                  </Link>
                </Nav.Link>
              )}
              {auth.isAuthenticated && (
                <Nav.Link href="#action3">
                  <Link className="nav-link text-white" to="/dashboard/forms">
                    Formulários
                  </Link>
                </Nav.Link>
              )}
              {auth.isAdmin && (
                <Nav.Link href="#action4">
                  <Link className="nav-link text-white" to="/dashboard/users">
                    Usuários
                  </Link>
                </Nav.Link>
              )}
            </Nav>
            {auth.isAuthenticated && (
              <Button variant="outline-light" onClick={logout}>
                SAIR
              </Button>
            )}
            {!auth.isAuthenticated && (
              <Button variant="outline-light">
                <Link className="nav-link text-white" to="/login">
                    ENTRAR
                  </Link>
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavHeader;
