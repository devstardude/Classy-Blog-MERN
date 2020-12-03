import React from "react";
import Masthead from "../../shared/masthead/Masthead";
import imageUrl from "../../../assets/images/nabout-bg.jpg";
//import'./About.css';

const About = (props) => {
  return (
    <React.Fragment>
    <Masthead about url={imageUrl}  />
     
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <p>Who...ME..?!</p>
            <p>
              ~ I am a
              <span class="About-me">
                {" "}
                Full Stack MERN Web Developer & Designer
              </span>
              focused on crafting
              <span class="About-me"> Great web experiences</span>.
            </p>
            <p>
              Coding and Designing have been my passion since the days I started
              working with computers but I found myself in Web development since
              last year.
            </p>

            <p>
              I'm also a Student at JC Bose University, currently doing Btech in
              Electronics and Communication, And part of a
              <span class="About-me">
                {" "}
                "Manan - The Coding society of YMCA"
              </span>{" "}
              .
            </p>

            <p>
              I focusses on crafting great web pages. Coding and Designing have
              been my areas of interest since my childhood, and I have a great
              inclination towards the web development and designing
              specifically.
            </p>

            <p>
              I have worked on various projects, and some of them are even live.
              They have received excellent feedback, which motivates me to
              explore this field more and more
            </p>
          </div>
        </div>
      </div>

      <hr />
    </React.Fragment>
  );
};

export default About;
