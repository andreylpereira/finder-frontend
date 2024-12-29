import React from "react";
import { Modal } from "react-bootstrap/";

const ObservationModal = ({ show, handleClose, observation }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
        Observação
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{observation ? observation : "Nenhuma observação disponível"}</Modal.Body>
    </Modal>
  );
};

export default ObservationModal;
