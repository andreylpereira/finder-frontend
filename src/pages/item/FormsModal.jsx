import React from "react";
import { Modal } from "react-bootstrap";

const FormsModal = ({ show, handleClose, forms }) => {
  return (
    <Modal show={show} onHide={() => handleClose("forms")} centered>
      <Modal.Header closeButton>
        <Modal.Title>Formulários</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forms.length > 0 ? (
          forms.map((form, index) => (
            <div key={index} className="text-center">
              <div>{form.nameUser}</div> 
            </div>
          ))
        ) : (
          <div className="text-center">Nenhum formulário encontrado.</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FormsModal;
