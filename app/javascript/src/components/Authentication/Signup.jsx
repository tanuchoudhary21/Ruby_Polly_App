import React, { useState } from "react";
import SignupForm from "components/Authentication/Form/SignupForm";
import authApi from "apis/auth";

const Signup = ({ history }) => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await authApi.signup({
        user: {
          first_name,
          last_name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };
  return (
    <SignupForm
      setfirst_name={setfirst_name}
      setlast_name={setlast_name}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
