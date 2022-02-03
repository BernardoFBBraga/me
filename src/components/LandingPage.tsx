import React from "react";
import "./LandingPage.css";
import ReactIcon from "../assets/logos/react.svg";
import CSS from "../assets/logos/CSS.svg";
import HTML from "../assets/logos/HTML.svg";
import Javascript from "../assets/logos/JavaScript.svg";
import Node from "../assets/logos/Node.svg";
import MongoDB from "../assets/logos/MongoDB.svg";
import Git from "../assets/logos/Git.svg";
import Redux from "../assets/logos/Redux.svg";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="landing-page-content">
        <header>
          <nav>Projects</nav>
          <nav>About me</nav>
          <nav>Contact</nav>
        </header>

        <main>
          <p className="title">Bernardo Braga</p>
          <p className="subtitle">Front-end developer</p>
          <br />
          <div className="about-me">
            <p>
              I love working in teams that value communication. Where people feel safe to ask questions, oppose
              decisions and propose alternatives.{" "}
            </p>
            <p>
              I have a history in innovation and entrepreneurship but I'm now focusing on my technical skills.
              Nevertheless, this experience gives me leverage to work together with designers and product owners, since
              I have a clear view of the business needs that must be met.
            </p>
            <p>
              You'll find that I'm a kind person, love helping others grow and I'm great at making sure everyone is on
              the same page.
            </p>
          </div>
          <aside>
            Tech I've been working with recently
            <ul>
              <li>
                <img className="logo" src={ReactIcon} />
              </li>
              <li>
                <img className="logo" src={HTML} alt="HTML" />
              </li>
              <li>
                <img className="logo" src={CSS} alt="CSS" />
              </li>
              <li>
                <img className="logo" src={Javascript} alt="Javascript" />
              </li>
              <li>
                <img className="logo" src={Node} alt="Node" />
              </li>
              <li>
                <img className="logo" src={MongoDB} alt="MongoDB" />
              </li>
              <li>
                <img className="logo" src={Git} alt="Git" />
              </li>
              <li>
                <img className="logo" src={Redux} alt="Redux" />
              </li>
            </ul>
          </aside>
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
