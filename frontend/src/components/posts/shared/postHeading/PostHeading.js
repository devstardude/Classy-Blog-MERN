import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {AuthContext} from "../../../shared/context/auth-context"
import { useHttpClient } from "../../../shared/hooks/http-hook"

const PostHeading = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/delete/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <div className="post-preview">
        <a href={`/post/${props.id}`}>
          <h2 className="post-title">{props.title}</h2>
        </a>
        <p className="post-meta">
          Posted by <a href="/">{props.username}</a> on {props.createdAt}
        </p>
        <h6 style={{ display: "revert" }}>( {props.description} )</h6>
        {props.edit && (
          <div>
            <div className=" mb-3">
              <NavLink
                to={`edit/${props.id}`}
                className="btn btn-info inline-block"
              >
                Edit Post
              </NavLink>
            </div>

            <div>
              <button onClick={deleteHandler} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        )}
        <hr/>
      </div>
    </React.Fragment>
  );
};

export default PostHeading;
