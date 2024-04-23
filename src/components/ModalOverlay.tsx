interface ModalOverlayProps {
  onClose:  () => void;
}

const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Clicking on the overlay will trigger onClose */}
    </div>
  );
};

export default ModalOverlay;