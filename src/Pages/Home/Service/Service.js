import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

const Service = ({ service }) => {
  const {_id, name, img, description, price } = service;
  const navigate = useNavigate();

  return (
    <div className="service">
      <img className="w-100" src={img} alt="" />
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>
        <small>{description}</small>
      </p>
      <button className="btn btn-primary" onClick={() => navigate(`/service/${_id}`)}>
        Book: {name}
      </button>
    </div>
  );
};

export default Service;
