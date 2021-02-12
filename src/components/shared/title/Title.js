const Title = ({ title = '', style = {}, className }) => {
  return (
    title && (
      <h2 style={style} className={className}>
        {title}
      </h2>
    )
  );
};

export default Title;
