import React, { useState } from "react";
import { Nav, Navbar, Container, Button, Modal, Form } from "react-bootstrap/";
import { Link } from "react-router-dom";
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
      <Navbar expand="lg" className="bg-primary shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-white">
            KRW Engenharia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
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
              <div className="d-flex justify-content-between" style={{ gap: "10px" }}>
                <Button variant="outline-light" onClick={handleShowPasswordModal}>
                  ALTERAR SENHA
                </Button>
                <Button variant="outline-light" onClick={logout}>
                  SAIR
                </Button>
              </div>
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

      <Modal show={showPasswordModal} onHide={handleClosePasswordModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Senha</Modal.Title>
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
