import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './backBtn.css';

const Backbtn: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="backbtnlayout">
      <button onClick={goBack} className="backButton">
     <NavigateBeforeIcon/>
      </button>
    </div>
  );
};

export default Backbtn;