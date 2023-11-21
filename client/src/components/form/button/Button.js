import React from "react";

import "./styles.css";

function Button({ name, onPress, type, style }) {
  return (
    <button
      type={type}
      onClick={onPress}
      className="btn btn-style"
      style={style}
    >
      {name}
    </button>
  );
}
export default Button;
