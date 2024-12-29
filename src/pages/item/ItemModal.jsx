import React from "react";
import { Modal, Form, Button, Figure } from "react-bootstrap/";

const ItemModal = ({
  show,
  handleClose,
  form,
  setForm,
  handleSubmit,
  modalMode,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const contentType = file.type;
        const base64Image = base64String.split(",")[1];

        setForm({
          ...form,
          contentType,
          base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalMode === "create" ? "Criar Item" : "Editar Item"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title || ""}
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={form.description || ""}
              required
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formLocalFound">
            <Form.Label>Local Encontrado</Form.Label>
            <Form.Control
              type="text"
              name="localFound"
              value={form.localFound || ""}
              required
              onChange={(e) =>
                setForm({ ...form, localFound: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formDateFound">
            <Form.Label>Data Encontrada</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dateFound"
              value={form.dateFound || ""}
              required
              onChange={(e) => setForm({ ...form, dateFound: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formPhoto">
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
            {form.base64Image && (
              <Figure className="mt-2">
                <Figure.Image
                  width={100}
                  height={100}
                  alt="Imagem do Item"
                  src={`data:${form.contentType};base64,${form.base64Image}`}
                />
              </Figure>
            )}
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={form.status || ""}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              required
            >
              <option value="">Selecione...</option>
              <option value="Novo">Novo</option>
              <option value="Em análise">Em análise</option>
              <option value="Recuperado">Recuperado</option>
              <option value="Descartado">Descartado</option>
            </Form.Control>
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

export default ItemModal;
