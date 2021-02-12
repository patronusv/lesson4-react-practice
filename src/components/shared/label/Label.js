const Label = ({ children, title, className = '' }) => {
  return (
    <label className={'input-group' + ' ' + className}>
      {title && <span className="input-group-text col-3 text-wrap">{title}</span>}
      {children}
    </label>
  );
};

export default Label;
