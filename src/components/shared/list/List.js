const List = ({ children, style = {} }) => {
  return (
    <ul style={style} className="list-group">
      {children}
    </ul>
  );
};

export default List;
