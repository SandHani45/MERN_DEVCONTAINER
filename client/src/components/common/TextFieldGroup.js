import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextFieldGroup = ({
  type,
  error,
  placeholder,
  value,
  name,
  onChange,
  info,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired
};
TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
