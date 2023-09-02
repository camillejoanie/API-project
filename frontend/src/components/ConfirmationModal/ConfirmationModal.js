// ConfirmationModal.js
import React from 'react';

function ConfirmationModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-modal">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Yes (Delete Spot)</button>
      <button onClick={onCancel}>No (Keep Spot)</button>
    </div>
  );
}

export default ConfirmationModal;
