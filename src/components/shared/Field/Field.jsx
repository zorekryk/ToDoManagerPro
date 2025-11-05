import "./Field.css";
import { CornerLeftUp } from "lucide-react";
import { Activity } from "react";

const Field = (props) => {
  const {
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    error,
    options = [],
    icon: Icon = null,
    ariaLabel,
    ...rest
  } = props;

  let inputElement;
  let labelElement;

  if (type === "textarea") {
    inputElement = (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
        rows={2}
        {...rest}></textarea>
    );
  } else if (type === "select") {
    inputElement = (
      <select id={id} name={name} {...rest}>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    );
  } else if (Icon) {
    inputElement = (
      <div className="input-wrapper">
        <Icon className="icon" />
        <input
          className={error ? "input-error" : ""}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          {...rest}
        />
      </div>
    );
  } else {
    inputElement = (
      <input
        className={error ? "input-error" : ""}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
    );
  }

  if (label) {
    labelElement = (
      <label htmlFor={id}>{label}</label>
    );
  } else {
    labelElement = (
      <label className="sr-only" htmlFor={id}>{ariaLabel}</label>
    );
  }

  return (
    <div className="field">
      {labelElement}
      {inputElement}
      <Activity mode={error ? "visible" : "hidden"}>
        <div className="error-wrapper">
          <CornerLeftUp className="error-icon" />
          <span className="error">{error}</span>
        </div>
      </Activity>
    </div>
  );
};

export default Field;