import React from "react";
import { Modal, Accordion, Container, Alert } from "react-bootstrap";

const FormsModal = ({ show, handleClose, forms, formatDate }) => {
  return (
    <Modal show={show} onHide={() => handleClose("forms")} centered>
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title className="text-white fw-bold">FORMULÁRIOS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forms.length > 0 ? (
          forms.map((form, index) => (
            <div key={index}>
              <Accordion defaultActiveKey="0" className="mb-2 shadow-sm">
                <Accordion.Item eventKey="index">
                  <Accordion.Header>
                    <b>{form.contactTitle}</b>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Container></Container>
                    <p className="m-0">
                      <b>Autor: </b>
                      {form.nameUser}
                    </p>
                    <p className="m-0">
                      <b>Contato: </b>
                      {form.contactUser}
                    </p>
                    <p className="fw-light">
                      <b>Data: </b>
                      {formatDate(form.contactDate)}
                    </p>
                    <hr />
                    <p>
                      <b>Descrição:</b>
                    </p>
                    <p className="text-justify">{form.contactDescription}</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))
        ) : (
          <Alert variant="info" className="text-justify text-center fst-italic">
            Nenhum formulário registrado.
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FormsModal;
