import React from "react";

import "./styles.css";

const Title = ({ title, subtitle }) => {
  return (
    <div className="container">
      <p className="title">{title}</p>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default Title;
