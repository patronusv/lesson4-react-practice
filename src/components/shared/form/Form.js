import React from 'react';

export const Form = ({ children, onHandleSubmit, className = '' }) => {
  const initClass = 'border border-success rounded p-3';
  return (
    <form onSubmit={onHandleSubmit} className={initClass + ' ' + className}>
      {children}
    </form>
  );
};
