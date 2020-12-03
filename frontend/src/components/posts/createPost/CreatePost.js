import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";
import Input from "../../shared/input/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Loading from "../../shared/loading/Loading";
import ImageUpload from "../../shared/imageUpload/ImageUpload";
import { uploadImage } from "../../../firebase/config";
import Masthead from "../../shared/masthead/Masthead";
import FormLayout from "../shared/formLayout/FormLayout";
import Error from "../../shared/error/Error";
//import'./CreatePost.css';

const CreatePost = (props) => {
  const auth = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const uploadingFile = async (imageFile) => {
    setUploading(true);
    const url = await uploadImage(imageFile);
    setUploading(false);
    console.log(url);
    return url;
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      let newFormData
      if (formState.inputs.image.value) {
        newFormData = JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          content: formState.inputs.content.value,
          image: await uploadingFile(formState.inputs.image.value),
        });
      } else{
        newFormData = JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          content: formState.inputs.content.value,
          image:"none"
        });
      }

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/new`,
        "POST",
        newFormData,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch {}
  };

  return (
    <React.Fragment>
      {isLoading || uploading ? <Loading asOverlay /> : null}
      <Masthead createPost />

      <FormLayout>
        {error && (
          <Error click={clearError} error={error}/>
        )}
        <form
          onSubmit={submitHandler}
          method="POST"
          encType="multipart/form-data"
        >
          <Input
            element="input"
            id="title"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="description"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
          />
          <Input
            element="textarea"
            id="content"
            type="text"
            label="Content (Min 6 Characters)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid content(Min 6 Characters)."
            onInput={inputHandler}
          />

          <div className="form-group mt-3">
            <ImageUpload
              id="image"
              errorText={"Please Provide an Image"}
              onInput={inputHandler}
              className="form-control-file"
            />
            <p>(If you want to)</p>
          </div>
          <hr />
          <div className="form-group my-4 text-center">
            <button
              disabled={!formState.isValid}
              type="submit"
              className="btn btn-primary"
            >
              Create Post
            </button>
          </div>
        </form>
      </FormLayout>
    </React.Fragment>
  );
};

export default CreatePost;
