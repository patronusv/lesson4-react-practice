import React from 'react';
import Label from '../label/Label';

export const Input = ({ title, onChange, placeholder = '', type = 'text', value, name, inputClass = '', labelClass = '' }) => {
  return (
    <Label title={title} className={labelClass}>
      <input type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} className={'form-control' + ' ' + inputClass} />
    </Label>
  );
};
