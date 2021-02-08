import React from 'react';
const Button = ({ component, title = '', onClick, name = '', value = '' }) => {
  return (
    <button onClick={onClick} name={name} value={value}>
      {component ? component : title}
    </button>
  );
};

export default Button;
