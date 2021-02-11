import React from 'react';

export const Form = ({ children, onHandleSubmit }) => {
  return (
    <form onSubmit={onHandleSubmit} className="form-control p-3">
      {children}
    </form>
  );
};
