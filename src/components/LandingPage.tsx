import React from "react";
import "./LandingPage.css";
import photo from "../assets/me.jpg";
import Techlist from "./Techlist";
import resume from "../assets/Bernardo F B Braga - Resume - CV.pdf";

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
              <a href={resume} download>
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

/*   <p>
            I'm a kind person, cooperative and available. Creating meaningful experiences brings me great joy and I
            believe the best software arises from good team work.
          </p>
          <p>
            Besides writing quality code, I can cooperate in every stage of product development, from conception,
            business modelling, design and iteration.
          </p>
          <p>I have experience in </p>
          */
/* 
<p>I'm a software developer from Brazil.</p>
<p>
  I am a problem solver in love with language and creativity, I've studied and worked with information
  representation and interpretation, such as real time dashboards, charts, diagrams, ontologies and
  narratives.
</p>
<p>
  I've been twice an entrepeneur. Started and led two start-ups through funding pitches, customer
  relationships and product development.
</p>
<p>Looking for a cooperative enviroment to create engaging user experiences.</p>
*/
export default LandingPage;
