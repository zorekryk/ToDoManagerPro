import "./Badge.css";

const Badge = (props) => {
  const {
    title,
    children,
    classname = ""
  } = props;
  const content = children || title;

  return (
    <span className={`badge ${classname}`}>
      {content}
    </span>
  );
};

export default Badge;