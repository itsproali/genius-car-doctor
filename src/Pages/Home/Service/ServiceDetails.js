import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/service/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);

  return (
    <div className="container my-4 d-flex align-items-center justify-content-evenly">
      <div className="service-image me-4">
        <img src={service.img} alt={service.name} />
      </div>
      <div className="service-text">
        <h2>Welcome to Service: {service.name}</h2>
        <p>{ service.description}</p>
        <div className="">
          <Link to="/checkout">
            <Button variant="primary">Proceed Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
