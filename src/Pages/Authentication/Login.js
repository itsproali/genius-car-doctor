import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import Social from "./Social";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef("");
  const passRef = useRef("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    if (error) {
      return;
    }
    signInWithEmailAndPassword(email, password);
  };

  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  if (loading || sending) {
    return <Loading />;
  }
  const resetPassword = () => {
    const email = emailRef.current.value;
    if (email) {
      sendPasswordResetEmail(email);
      toast("Email Sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast("Please Enter Your Email");
    }
  };

  if (user) {
    navigate(from, { replace: true });
  }
  return (
    <div className="container col-10 col-sm-7 col-md-4  mx-auto border border-3 border-primary p-4 mt-5 rounded shadow position-relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        {error && <p className="text-danger">{error.message}</p>}
        {resetError && <p className="text-danger">{resetError.message}</p>}

        <p className="my-3">
          Forget Your Password?{" "}
          <Link to="/login" onClick={resetPassword}>
            Reset Password
          </Link>
        </p>
        <Button
          className="w-75 mx-auto d-block"
          variant="primary"
          type="submit"
        >
          Login
        </Button>

        <p className="my-3">
          New to Genius Car? <Link to="/register"> Register Now</Link>
        </p>
      </Form>

      <Social></Social>
    </div>
  );
};

export default Login;
