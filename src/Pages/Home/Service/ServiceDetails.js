import React from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  return (
    <div>
      <h1>Welcome to Service {serviceId}</h1>
      <div className="text-center">
        <Link to='/checkout'>
          <Button variant="primary">Proceed Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetails;
