import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles.jsx";
import { useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.comonent";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormField] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handelChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormField();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Wrong password!");
          break;
        case "auth/user-not-found":
          alert("no user assosiated with this email");
          break;
        case "auth/invalid-login-credentials":
          alert("no user assosiated with this email");
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>sign in with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput
          label={"email"}
          name="email"
          value={email}
          onChange={handelChange}
          required
        />
        <FormInput
          label={"password"}
          name="password"
          value={password}
          onChange={handelChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
