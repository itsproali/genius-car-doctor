import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateService = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://enigmatic-sands-43485.herokuapp.com/service/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const updatedService = { name, price, description };

    fetch(`https://enigmatic-sands-43485.herokuapp.com/service/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedService),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Service Updated Successfully.");
        navigate(`/service/${id}`);
      });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-primary mb-2">
        Enter What you want to update.
      </h2>
      <form className="text-center" onSubmit={handleUpdate}>
        <input
          className="d-block my-3 w-50 p-2 mx-auto"
          type="text"
          name="name"
          id="name"
          defaultValue={service.name}
          placeholder="Enter Service Name"
          required
        />
        <input
          className="d-block my-3 w-50 p-2 mx-auto"
          type="number"
          name="price"
          id="price"
          defaultValue={service.price}
          placeholder="Enter Service Price"
          required
        />
        <textarea
          className="d-block my-3 w-50 p-2 mx-auto"
          name="description"
          id="description"
          cols="30"
          rows="5"
          defaultValue={service.description}
          placeholder="Describe About Service"
          required
        ></textarea>
        <input className="w-50 p-2" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateService;
