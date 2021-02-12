const Container = ({ children, className }) => {
  return <div className={'container col-lg-5 col-md-8 col-sm-12 py-3 border' + ' ' + className}>{children}</div>;
};

export default Container;
