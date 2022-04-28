import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useServiceDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [user] = useAuthState(auth);

  const [service] = useServiceDetails(serviceId);
  console.log(service);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const serviceName = service.name;
    const info = { name, email, address, phone, serviceName };

    axios
      .post("https://enigmatic-sands-43485.herokuapp.com/order", info)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1 className="text-center text-primary">
        Let's Complete Your Checkout !!!
      </h1>
      <div className="container d-md-flex my-5 align-items-center justify-center">
        <div className="w-100 w-md-50 text-center">
          <img className="img=fluid" src={service.img} alt={service.name} />
          <h2 className="my-2">{service.name}</h2>
        </div>
        <form
          className="w-100 w-md-50 mx-auto p-3 text-center"
          onSubmit={handleSubmit}
        >
          <input
            className="w-100 w-md-75 my-2 p-2 rounded"
            type="text"
            name="name"
            id="name"
            value={user.displayName}
            required
            disabled
          />
          <input
            className="w-100 w-md-75 my-2 p-2 rounded"
            type="email"
            name="email"
            id="email"
            value={user.email}
            required
            disabled
          />
          <input
            className="w-100 w-md-75 my-2 p-2 rounded"
            type="text"
            name="address"
            id="address"
            required
            placeholder="Enter your address"
          />
          <input
            className="w-100 w-md-75 my-2 p-2 rounded"
            type="number"
            name="phone"
            id="phone"
            required
            placeholder="Enter your phone number"
          />
          <input
            className="w-100 w-md-75 my-2 p-2 rounded btn-primary"
            type="submit"
            value="Checkout"
          />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
