import React, { useState } from "react";
import { Nav, Navbar, Container, Button, Modal, Form } from "react-bootstrap/";
import { NavLink } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import { updatePassword } from "./../services/userService";
import { toast } from "sonner";

const NavHeader = () => {
  const { logout, auth } = useAuth();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => {
    setNewPassword("");
    setShowPasswordModal(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updatePassword(newPassword);
      setIsLoading(false);
      toast.success("Senha alterada com sucesso.");
      handleClosePasswordModal();
    } catch (err) {
      setIsLoading(false);
      toast.error("Erro ao alterar senha.");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-primary shadow-sm user-select-none">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-white fst-italic">
            KRW Engenharia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white fst-italic fw-bold active"
                      : "nav-link text-light fst-italic"
                  }
                >
                  HOME
                </NavLink>
              </Nav.Link>
              {auth.isAuthenticated && (
                <Nav.Link>
                  <NavLink
                    to="/dashboard/items"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-white fst-italic fw-bold active"
                        : "nav-link text-light fst-italic"
                    }
                  >
                    ITENS
                  </NavLink>
                </Nav.Link>
              )}
              {auth.isAdmin && (
                <Nav.Link>
                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-white fst-italic fw-bold active"
                        : "nav-link text-light fst-italic"
                    }
                  >
                    USUÁRIOS
                  </NavLink>
                </Nav.Link>
              )}
            </Nav>
            {auth.isAuthenticated && (
              <div
                className="d-flex justify-content-between"
                style={{ gap: "10px" }}
              >
                <Button
                  variant="outline-light"
                  onClick={handleShowPasswordModal}
                >
                  ALTERAR SENHA
                </Button>
                <Button variant="outline-light" onClick={logout}>
                  SAIR
                </Button>
              </div>
            )}
            {!auth.isAuthenticated && (
              <Button variant="outline-light">
                <NavLink className="nav-link text-white" to="/login">
                  ENTRAR
                </NavLink>
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showPasswordModal}
        onHide={handleClosePasswordModal}
        centered
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className="text-white fw-bold">
            ALTERAR SENHA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>Nova Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              className="w-100"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Alterando..." : "Alterar Senha"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavHeader;
