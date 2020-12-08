import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";
import Input from "../../shared/input/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Loading from "../../shared/loading/Loading";
import Masthead from "../../shared/masthead/Masthead";
import FormLayout from "../shared/formLayout/FormLayout";
import Error from "../../shared/error/Error";

const MyPostEdit = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();
  const postEditId = useParams().postEditId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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
    },
    false
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/post/${postEditId}`
        );
        setLoadedPost(responseData.post);
        setFormData(
          {
            title: {
              value: responseData.post.title,
              isValid: true,
            },
            description: {
              value: responseData.post.description,
              isValid: true,
            },
            content: {
              value: responseData.post.content,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, postEditId, setFormData]);

  const postUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/myposts/edit/${postEditId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          content: formState.inputs.content.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Masthead myPostEdit />
      {/* Loading state  */}
      <div className=" text-center ">{isLoading && <Loading />}</div>
      {/* No Loading but Post loaded  */}
      {!isLoading && loadedPost && (
        <FormLayout>
          {/* Error Handling */}
          {error && <Error click={clearError} error={error} />}
          <form
            onSubmit={postUpdateSubmitHandler}
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
              initialValue={loadedPost.title}
              initialValid={true}
            />
            <Input
              element="input"
              id="description"
              type="text"
              label="Description"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid description."
              onInput={inputHandler}
              initialValue={loadedPost.description}
              initialValid={true}
            />
            <Input
              element="textarea"
              id="content"
              type="text"
              label="Content"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid content."
              onInput={inputHandler}
              initialValue={loadedPost.content}
              initialValid={true}
            />
            <div className="form-group my-4 text-center">
              <button type="submit" className="btn btn-primary">
                Update Post
              </button>
            </div>
          </form>
        </FormLayout>
      )}
    </React.Fragment>
  );
};

export default MyPostEdit;
