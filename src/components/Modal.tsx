import React from 'react';
import './Modal.css'

interface ModalProps {
  
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Вы действительно хотите удалить занятие?</h1>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;