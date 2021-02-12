import React from 'react';
import Title from '../title/Title';
const Section = ({ children, title, className = '' }) => {
  return (
    <section className={'pt-4' + ' ' + className}>
      <Title title={title} />
      {children}
    </section>
  );
};

export default Section;
