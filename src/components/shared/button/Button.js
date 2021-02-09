import React from 'react';
const Button = ({ component, title = '', onClick = null, name = '', value = '', style = {}, type = 'button' }) => {
  return onClick ? (
    <button onClick={onClick} name={name} value={value} style={style} type={type}>
      {component ? component : title}
    </button>
  ) : (
    <button name={name} value={value} style={style} type={type}>
      {component ? component : title}
    </button>
  );
};

export default Button;
