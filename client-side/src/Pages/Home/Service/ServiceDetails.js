import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import useServiceDetails from "../../../hooks/useServiceDetails";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const navigate = useNavigate();

  // Update a Service
  const handleUpdate = () => {
    navigate(`/update/${serviceId}`);
  };

  // Delete Service
  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure, You want to delete this service?"
    );
    if (confirm) {
      fetch(`http://localhost:5000/service/${serviceId}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/");
        });
    }
  };

  return (
    <div className="container my-5 mx-auto">
      <div className="row g-4">
        <div className="col-12 col-md-5 text-center">
          <img className="img-fluid" src={service.img} alt={service.name} />
        </div>
        <div className="col-12 col-md-7 service-text">
          <h2 className="fw-bold">{service.name}</h2>
          <p>{service.description}</p>
          <div className="d-flex align-items-center">
            <Link to={`/checkout/${serviceId}`}>
              <Button variant="primary">Proceed Checkout</Button>
            </Link>
            <Button
              className="mx-4 text-white"
              variant="warning"
              onClick={handleUpdate}
            >
              Edit Service
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
