import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "sonner";
import { createForm } from "../../services/formService";

const HomeModal = ({ show, handleClose, itemId }) => {
  const [form, setForm] = useState({
    nameUser: "",
    contactUser: "",
    contactTitle: "",
    contactDescription: "",
    itemId: itemId,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.nameUser || !form.contactUser || !form.contactTitle) {
      toast.error("Todos os campos obrigatórios devem ser preenchidos.");
      setIsLoading(false);
      return;
    }

    try {
      await createForm(form);
      toast.success("Formulário enviado com sucesso.");
      handleClose();
    } catch (error) {
      toast.error("Erro ao enviar formulário.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Alterar Informações</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNameUser">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o seu nome completo"
              name="nameUser"
              value={form.nameUser}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactUser">
            <Form.Label>Contato</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite telefone e/ou e-mail de contato"
              name="contactUser"
              value={form.contactUser}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite um título"
              name="contactTitle"
              value={form.contactTitle}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Dê mais informações"
              name="contactDescription"
              value={form.contactDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "ENVIAR"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default HomeModal;
