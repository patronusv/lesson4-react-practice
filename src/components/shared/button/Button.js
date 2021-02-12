import React from 'react';
const Button = ({ component, title = '', onClick = null, name = '', value = '', style = {}, type = 'button', className }) => {
  const Component = component;
  return onClick ? (
    <button onClick={onClick} name={name} value={value} style={style} type={type} className={className ? 'btn' + ' ' + className : 'btn'}>
      {component ? <Component /> : title}
    </button>
  ) : (
    <button name={name} value={value} style={style} type={type} className={className ? 'btn' + ' ' + className : 'btn'}>
      {component ? <Component /> : title}
    </button>
  );
};

export default Button;
