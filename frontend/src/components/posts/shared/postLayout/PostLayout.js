import React from 'react';

const PostLayout = (props)=>{
    return(
    <React.Fragment>
         <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                {props.children}
              </div>
            </div>
          </div>
    </React.Fragment>
);
};

export default PostLayout ;