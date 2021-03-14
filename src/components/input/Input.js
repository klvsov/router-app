import React from 'react';

import './Input.css';

const Input = ({ changeHandler, inputType, classNames, text }) => {
  return (
    <div className="input-control">
      <input
        placeholder={text}
        onChange={changeHandler}
        className={classNames}
        type={inputType}
      />
    </div>
  );
};

export default Input;
