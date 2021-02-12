import React from 'react';

export const Select = ({ sets, onChange, value, labelClass = '' }) => {
  const { name, title, options } = sets;
  return (
    <label className={labelClass}>
      {title && title}
      <select name={name} value={value} onChange={onChange} className="form-select">
        {options.map(({ value, title }) => (
          <option key={value} value={value}>
            {console.log('title', title)}
            {typeof title === 'function' ? title() : title}
          </option>
        ))}
      </select>
    </label>
  );
};
