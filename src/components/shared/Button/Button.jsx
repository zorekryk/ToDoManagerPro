import "./Button.css";

const Button = (props) => {
  const {
    classname = "",
    title,
    type = "button",
    icon: Icon = null,
    iconPosition = "left",
    ...rest
  } = props;
  return (
    <button className={`button ${classname}`} type={type} {...rest}>
      {Icon && iconPosition === "left" && (
        <Icon className="button__icon left" />
      )}
      {title}
      {Icon && iconPosition === "right" && (
        <Icon className="button__icon right" />
      )}
    </button>
  );
};

export default Button;