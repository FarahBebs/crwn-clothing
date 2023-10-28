import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.comonent";
import { SignUpContainer } from "./sign-up.styles";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart, signUpSuccess } from "../../store/user/user.action";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      alert("done");
      resetFormField();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("cannot create user,email already in use");
      }
    }
  };

  const handelChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your Email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handelChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handelChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handelChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handelChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
