import React from 'react';

//import'./Masthead.css';

const Masthead = (props)=>{
    return (
      <React.Fragment>
        <header
          className="masthead"
          style={{ backgroundImage: `url(${props.url})` }}
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                {props.home && (
                  <div className="site-heading">
                    <h1>Classy Blog</h1>
                    <span className="subheading">
                      A Featured Blog Post Application
                    </span>
                  </div>
                )}

                {props.mypost && (
                  <div className="site-heading">
                    <h1>Classy Blog</h1>
                    <span className="subheading">
                      Hi <strong>{props.authName}</strong> , Here are your Posts{" "}
                    </span>
                    <br />
                    <span className="subheading"> </span>
                  </div>
                )}

                {props.createPost && (
                  <div className="page-heading">
                    <h1>Create New Post</h1>
                  </div>
                )}
                {props.myPostEdit && (
                  <div className="page-heading">
                    <h1>Edit Post</h1>
                  </div>
                )}

                {props.singlePost && (
                  <div className="post-heading">
                    <h1>{props.title} </h1>
                    <span className="meta">
                      Posted by <a href="/">{props.username}</a> on{" "}
                      {props.createdAt}
                    </span>
                  </div>
                )}
                {props.about && (
                  <div class="page-heading">
                    <h1>About Me</h1>
                    <span class="subheading">This is what I do.</span>
                  </div>
                )}
                {props.auth && (
                  <div className="page-heading">
                    <h1>
                      {props.mode ? "Login User" : "Create A New Account"}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
};

export default Masthead ;