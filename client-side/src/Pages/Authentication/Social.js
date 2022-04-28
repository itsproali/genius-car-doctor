import React from "react";
import { Button } from "react-bootstrap";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";

const Social = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithFacebook, user1, loading1, error1] =
    useSignInWithFacebook(auth);
  const [signInWithGithub, user2, loading2, error2] = useSignInWithGithub(auth);

  if (loading || loading1 || loading2) {
    return <Loading />;
  }

  let showError;
  if (error || error1 || error2) {
    showError = (
      <p className="text-danger">
        {error?.message} {error1?.message} {error2?.message}
      </p>
    );
  }

  if (user || user1 || user2) {
    navigate(from, { replace: true });
  }

  return (
    <div className="mt-2">
      <div className="d-flex align-items-center justify-content-evenly mx-auto">
        <div className="col-5 bg-secondary" style={{ height: "1px" }}></div>
        <p className="mb-0">or</p>
        <div className="col-5 bg-secondary" style={{ height: "1px" }}></div>
      </div>

      {showError}
      <Button
        onClick={() => signInWithGoogle()}
        variant="outline-primary"
        className="d-flex align-items-center justify-content-center mx-auto w-100 my-3"
      >
        <img
          src="https://img.icons8.com/color/344/google-logo.png"
          alt="Google"
          className="me-3"
          width="30px"
        />
        <span>Continue With Google</span>
      </Button>

      <Button
      disabled
        onClick={() => signInWithFacebook()}
        variant="outline-success"
        className="d-flex align-items-center justify-content-center mx-auto w-100 my-3"
      >
        <img
          src="https://img.icons8.com/fluency/344/facebook-new.png"
          alt="Google"
          className="me-3"
          width="30px"
        />
        <span>Continue With Facebook</span>
      </Button>
      <Button
        onClick={() => signInWithGithub()}
        variant="outline-warning"
        className="d-flex align-items-center justify-content-center mx-auto w-100 my-3"
      >
        <img
          src="https://img.icons8.com/glyph-neue/452/github.png"
          alt="Google"
          className="me-3"
          width="30px"
        />
        <span>Continue With Github</span>
      </Button>
    </div>
  );
};

export default Social;
