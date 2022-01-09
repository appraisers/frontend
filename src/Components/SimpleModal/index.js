import { Backdrop, Modal } from '@material-ui/core';

import './SimpleModal.scss';

const SimpleModal = ({ onClose, open, children }) => {
  return (
    <Modal
      open={open}
      className="modal-window"
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1000
      }}
    >
      {children}
    </Modal>
  );
};

export default SimpleModal;
