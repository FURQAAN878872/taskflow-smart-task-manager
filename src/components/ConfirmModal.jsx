function ConfirmModal({
  title,
  message,
  confirmText = 'Delete',
  onConfirm,
  onClose,
}) {
  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="confirm-modal"
        onMouseDown={e =>
          e.stopPropagation()
        }
      >
        <div className="confirm-icon">
          !
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="danger-button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;