import React from "react";
import { Modal, Alert } from "react-bootstrap/";

const ObservationModal = ({ show, handleClose, observation }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title className="text-white fw-bold">OBSERVAÇÃO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {observation ? (
          observation
        ) : (
          <Alert variant="info" className="text-justify text-center fst-italic">
            Nenhuma observação foi registrada.
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ObservationModal;
