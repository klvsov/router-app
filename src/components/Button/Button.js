import React from 'react';

import './Button.css';

const Button = ({ onClickHandler, text }) => {
  return (
    <div className="button-control">
      <button onClick={onClickHandler}>{text}</button>
    </div>
  );
};

export default Button;
