import "./Button.css";

const Button = (props) => {
  const {
    classname = "",
    type = "button",
    children,
    ...rest
  } = props;
  return (
    <button className={`button ${classname}`} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;