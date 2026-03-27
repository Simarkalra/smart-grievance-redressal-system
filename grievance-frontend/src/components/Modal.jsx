import React from "react";
import "./Modal.css";

export default function Modal({ isOpen, title, message, onClose, type = "info" }) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content modal-${type}`}>
        <div className="modal-icon">{getIcon()}</div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
}
