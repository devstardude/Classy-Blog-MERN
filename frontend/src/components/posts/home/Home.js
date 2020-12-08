import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Masthead from "../../shared/masthead/Masthead";
import PostHeading from "../shared/postHeading/PostHeading";
import imageUrl from "../../../assets/images/home-bg.jpg";
import Loading from "../../shared/loading/Loading";
import PostLayout from "../shared/postLayout/PostLayout";
import Error from "../../shared/error/Error";

const Home = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPosts, setLoadedPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest]);

  // when no posts exist in returned array 
  let noPostLoaded;
  if (loadedPosts) {
    if (loadedPosts.length === 0) {
      noPostLoaded = true;
    }
  }

  return (
    <React.Fragment>
      <Masthead home url={imageUrl} />
      <PostLayout>
        {/* Loading State  */}
        <div className=" text-center ">{isLoading && <Loading />}</div>

        {/* Error handling */}
        {error && <Error click={clearError} error={error} />}

        {/* When Loading stops and Posts are loaded */}
        {!isLoading && loadedPosts && (
          <div>
            {loadedPosts.map((post) => (
              <PostHeading
                key={post.id}
                id={post.id}
                title={post.title}
                username={post.username}
                createdAt={post.time}
                description={post.description}
              />
            ))}
          </div>
        )}

        {/* When Loading stops But No Post is Loaded */}
        {!isLoading && noPostLoaded && (
          <div className="post-preview text-center">
            <h2 className="post-title">No post to show</h2>
          </div>
        )}
      </PostLayout>
    </React.Fragment>
  );
};

export default Home;
