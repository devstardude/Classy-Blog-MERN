import React from 'react';

const Error = (props)=>{
    return (
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        {props.error}
        <button
        onClick={props.click}
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
};

export default Error ;