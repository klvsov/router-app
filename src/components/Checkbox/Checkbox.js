import React from 'react';

import './Checkbox.css';

const Checkbox = ({ label, onChangeHandler, rememberMe }) => {
  return (
    <div className="checkbox-control">
      <input
        type="checkbox"
        id="check"
        checked={rememberMe}
        onChange={onChangeHandler}
      />
      <label htmlFor="check">{label}</label>
    </div>
  );
};

export default Checkbox;
