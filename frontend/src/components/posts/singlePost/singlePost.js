import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Error from "../../shared/error/Error";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loading from "../../shared/loading/Loading";
import Masthead from "../../shared/masthead/Masthead";

//import'./SinglePost.css';

const SinglePost = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();
  const postId = useParams().postId;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/post/${postId}`
        );

        setLoadedPost(responseData.post);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, postId]);

  return (
    <React.Fragment>
      {isLoading && <Loading asOverlay />}
      {!isLoading && loadedPost && (
        <div>
          <Masthead
            url={loadedPost.image}
            singlePost
            title={loadedPost.title}
            username={loadedPost.username}
            createdAt={loadedPost.time}
          />
          {error && <Error click={clearError} error={error} />}

          <article>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <Markdown
                    escapeHtml={false}
                    source={loadedPost.sanitizedContent}
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </React.Fragment>
  );
};

export default SinglePost;
