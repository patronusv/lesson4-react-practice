import React from 'react';
import Title from '../title/Title';
const Section = ({ children, title }) => {
  return (
    <section>
      <Title title={title} />
      {children}
    </section>
  );
};

export default Section;
