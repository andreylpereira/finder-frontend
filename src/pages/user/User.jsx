import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUserAction,
  updateUserAction,
} from "../../redux/actions/userActions";
import Bread from "../../components/Bread";
import { toast } from "sonner";
import {
  Table,
  Spinner,
  Container,
  Button,
  Col,
  Modal,
  Form,
} from "react-bootstrap/";

const User = () => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [modalError, setModalError] = useState(null);

  const { users, loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    position: "",
    enable: true,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleModalCreate = () => {
    setModalMode("create");
    setForm({
      email: "",
      password: "",
      name: "",
      role: "",
      position: "",
      enable: true,
    });
    setModalVisible(true);
  };

  const handleModalEdit = (user) => {
    setModalMode("edit");
    setForm({
      id: user.id,
      email: user.email,
      password: null,
      name: user.name,
      role: user.role,
      position: user.position,
      enable: user.enable,
    });
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setForm({
      email: "",
      password: "",
      name: "",
      role: "",
      position: "",
      enable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "create") {
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        position: form.position,
        enable: form.enable,
      };

      dispatch(createUserAction(newUser))
        .then(() => {
          fetchUsers();
          toast.success("Usuário cadastrado com sucesso.");
          handleClose();
        })
        .catch((error) => toast.error(error.message));
    } else if (modalMode === "edit") {
      const updatedUser = {
        id: form.id,
        name: form.name,
        email: form.email,
        password: null,
        role: form.role,
        position: form.position,
        enable: form.enable,
      };

      dispatch(updateUserAction(updatedUser, updatedUser.id))
        .then(() => {
          dispatch(fetchUsers());
          toast.success("Usuário atualizado com sucesso");
          handleClose();
        })
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center min-vh-100 user-select-none">
        <Col className="w-100">
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "calc(70vh - 50px)" }}
            >
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </div>
          )}
          {error && !loading && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          {users.length > 0 && (
            <div>
              <h5 className="fw-bold mb-5 mt-5">
              <Bread current="Usuários" />
              </h5>
              <Button
                type="button"
                className="fw-bold bg-gradient rounded shadow"
                onClick={handleModalCreate}
              >
                CADASTRAR
              </Button>
              <Table striped bordered hover className="shadow mt-3">
                <thead>
                  <tr className="text-center text-uppercase">
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Cargo</th>
                    <th>Role</th>
                    <th>Habilitado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="text-center">
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.position}</td>
                      <td>{user.role}</td>
                      <td>{user.enable ? "Sim" : "Não"}</td>
                      <td>
                        {user.id !== 1 ? (
                          <Button
                            type="button"
                            className="fw-bold bg-gradient rounded shadow"
                            onClick={() => handleModalEdit(user)}
                          >
                            EDITAR
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            className="fw-bold bg-gradient rounded shadow"
                            disabled
                          >
                            EDITAR
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {!loading && users.length === 0 && !error && (
            <div className="alert alert-warning mt-3" role="alert">
              Não há usuário cadastrados.
            </div>
          )}
        </Col>
      </Container>

      <Modal show={modalVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Criar Usuário" : "Editar Usuário"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name || ""}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email || ""}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            {modalMode === "create" && (
              <Form.Group controlId="formPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password || ""}
                  required
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Form.Group>
            )}

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={form.role || ""}
                required
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPosition">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={form.position || ""}
                required
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEnable">
              <Form.Label>Habilitado</Form.Label>
              <Form.Check
                type="checkbox"
                label="Sim"
                checked={modalMode === "create" ? true : form.enable}
                onChange={(e) => setForm({ ...form, enable: e.target.checked })}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="primary" type="submit">
                {modalMode === "create" ? "Criar" : "Atualizar"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default User;
