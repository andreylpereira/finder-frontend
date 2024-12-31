import React from "react";
import { Modal, Figure } from "react-bootstrap/";

const PhotoModal = ({ show, handleClose, photo }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="bg-primary" closeButton>
        <Modal.Title className="text-white fw-bold">FOTO DO ITEM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Figure>
          <Figure.Image
            className="shadow border-1 rounded m-0"
            width={800}
            height={600}
            alt="Imagem do Item"
            src={photo}
          />
        </Figure>
      </Modal.Body>
    </Modal>
  );
};

export default PhotoModal;
