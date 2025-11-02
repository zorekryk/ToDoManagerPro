import "./Field.css";
import { CornerLeftUp } from "lucide-react";
import { Activity, useId } from "react";

const Field = (props) => {
  const {
    label,
    type = "text",
    placeholder = "",
    error,
    options = [],
    ...rest
  } = props;
  const id = useId();

  let inputElement;

  if (type === "textarea") {
    inputElement = (
      <textarea
        id={id}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
        rows={2}
        {...rest}></textarea>
    );
  } else if (type === "select") {
    inputElement = (
      <select id={id} {...rest}>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    );
  } else {
    inputElement = (
      <input
        className={error ? "input-error" : ""}
        id={id}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
    );
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
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