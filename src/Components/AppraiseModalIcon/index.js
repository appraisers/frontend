import React, { useState } from 'react';

import appraiseIcon from '../../assets/icons/appraise-icon.svg';
import SimpleModal from '../SimpleModal';

import './AppraiseModalIcon.scss';

const AppraiseModalIcon = ({ rows }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="appraise-main-container">
      <img
        src={appraiseIcon}
        onClick={() => setOpen(true)}
        className="appraise-user-logo"
        alt="appraise"
      />

      <SimpleModal open={open} onClose={() => setOpen(false)}>
        <div className="appraise-modal-main-container">
          Content
        </div>
      </SimpleModal>
    </div>
  );
};

export default AppraiseModalIcon;
