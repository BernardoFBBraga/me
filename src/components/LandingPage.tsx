import React from "react";
import "./LandingPage.css";
import photo from "../assets/me.jpg";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="landing-page-content">
        {/*<header>
          <nav>Projects</nav>
          <nav>About me</nav>
          <nav>Contact</nav>
        </header>*/}

        <main>
          <img className="pfp" src={photo} />
          <p className="title">Bernardo Braga</p>
          <p className="subtitle">Front-end developer</p>
          <br />
          <div className="about-me">
            <p>
              I've always enjoyed challenges and solving the puzzles that life offers me. I found in the developer
              career a means to be creative and I've relished the opportunity to create innovative products for over ten
              years. In this journey, I've come to the conclusion that my purpose is to be a part of collaborative
              environments. I love working in teams that value communication, where people feel safe to ask questions,
              oppose decisions and propose alternatives. I like helping people get unstuck and learning from my peers,
              with pair programming.
            </p>
            <p>
              I'm looking for my next employment and I'm open to talk! Download my
              <a href={"https://s3.sa-east-1.amazonaws.com/curriculo.bernardobraga.dev.br/Bernardo+F+B+Braga+-+Resume+-+CV.pdf"} download>
                {" resume "}
              </a>
              or reach me at <a href="https://www.linkedin.com/in/bernardofbbraga/">LinkedIn</a>.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
