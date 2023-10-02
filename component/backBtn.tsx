import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './backBtn.css';

const Backbtn: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="backbtnlayout">
      <button onClick={goBack} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default Backbtn;