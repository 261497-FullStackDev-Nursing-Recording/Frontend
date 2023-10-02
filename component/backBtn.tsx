import React, { useState } from 'react';
import Link from 'next/link';
import "./backBtn.css"
const Backbtn: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="backbtnlayout">
     
      
      <button onClick={goBack} className="backButton">&larr; Back</button>
    </div>
  );
};

export default Backbtn;