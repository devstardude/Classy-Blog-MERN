import React from "react";

//import'./FormLayout.css';

const FormLayout = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
            {props.children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
