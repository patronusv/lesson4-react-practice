const Item = ({ children, className = '' }) => {
  return <li className={'list-group-item' + ' ' + className}>{children}</li>;
};

export default Item;
