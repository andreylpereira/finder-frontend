import React from "react";
import { Modal, Figure } from "react-bootstrap/";

const PhotoModal = ({ show, handleClose, photo }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
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
