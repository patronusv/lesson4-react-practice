const Flex = ({ children, className = '' }) => {
  return <div className={'d-flex' + ' ' + className}>{children}</div>;
};

export default Flex;
