import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import Input from "../../shared/input/Input";
import Loading from "../../shared/loading/Loading";
import Masthead from "../../shared/masthead/Masthead";
import FormLayout from "../../posts/shared/formLayout/FormLayout";
import Error from "../../shared/error/Error";
import * as Scroll from "react-scroll";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  var scroll = Scroll.animateScroll;
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
    scroll.scrollToTop();
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.name,
          responseData.email
        );
      } catch (err) {
        console.log("login unsuccess" + err);
      }
    } else {
      try {
        const newFormData = JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        });

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          newFormData,
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.name,
          responseData.email
        );
      } catch {}
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loading asOverlay />}
      <Masthead auth mode={isLoginMode} />

      <FormLayout>
        {error && <Error click={clearError} error={error} />}
        <form
          onSubmit={authSubmitHandler}
          method="POST"
          encType="multipart/form-data"
        >
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
          )}

          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />

          <div className="form-group my-4 text-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!formState.isValid}
            >
              SUBMIT
            </button>
          </div>
        </form>
        <hr />
        <div className="form-group my-4 text-center">
          <p className="lead mt-4">{isLoginMode && "Don't "}Have An Account?</p>
          <button className="btn btn-warning" onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </button>
        </div>
      </FormLayout>
    </React.Fragment>
  );
};
export default Auth;
