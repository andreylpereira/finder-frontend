import React from "react";
import { Modal, Form, Button } from "react-bootstrap/";

const UserModal = ({
  show,
  handleClose,
  form,
  setForm,
  handleSubmit,
  modalMode,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title className="text-white fw-bold">
          {modalMode === "create" ? "CRIAR USUÁRIO" : "EDITAR USUÁRIO"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}>
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
          )}

          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={form.role || ""}
              required
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="FUNCIONARIO">Funcionário</option>
            </Form.Control>
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
  );
};

export default UserModal;
