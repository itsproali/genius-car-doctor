import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import "./Register.css";
import Social from "./Social";
import Loading from "../Shared/Loading/Loading";

const Register = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile] = useUpdateProfile(auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    navigate("/");
  }

  return (
    <div className="container col-10 col-sm-7 col-md-4 mx-auto border border-3 border-primary p-4 mt-5 rounded shadow">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="input-field"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-field"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-field"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="form-group d-flex align-items-center">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onClick={() => setAgree(!agree)}
            className="me-2"
          />
          <label
            htmlFor="terms"
            className={agree ? "text-success" : "text-danger"}
          >
            Accept Terms And Condition
          </label>
        </div>
        {error && <p className="text-danger">{error.message}</p>}
        <div className="form-group">
          <input
            disabled={!agree}
            className="btn-primary"
            type="submit"
            value="Register"
          />
        </div>

        <p>
          Already Have an account? <Link to="/login"> Please Login</Link>
        </p>
      </Form>

      <Social></Social>
    </div>
  );
};

export default Register;
