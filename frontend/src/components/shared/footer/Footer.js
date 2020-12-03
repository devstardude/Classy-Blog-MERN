import React from "react";

//import'./Footer.css';

const Footer = (props) => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <ul className="list-inline text-center">
              <li className="list-inline-item">
                <a href="/">
                  <span className="mr-3" style={{ fontSize: "1.5em" }}>
                    <i className="fab fa-facebook "></i>
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">
                  <span style={{ fontSize: "1.5em" }}>
                    <i className="fab fa-twitter "></i>
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">
                  <span className="ml-3" style={{ fontSize: "1.5em" }}>
                    <i className="fab fa-instagram "></i>
                  </span>
                </a>
              </li>
            </ul>
            <p className="copyright text-muted " style={{ marginTop: "0.5rem" }}>
              Copyright &copy; Arun Shekhar 2020
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
