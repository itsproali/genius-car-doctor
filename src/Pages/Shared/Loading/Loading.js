import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" variant="primary" className="spinner" />
    </div>
  );
};

export default Loading;
