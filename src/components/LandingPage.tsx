import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="landing-page-content">
        <header>
          <nav>About me</nav>
          <nav>Skills</nav>
          <nav>Portifolio</nav>
        </header>

        <main>
          <p className="title">Bernardo Braga</p>
          <p className="subtitle">Front-end developer</p>
        </main>
      </div>
    </>
  );
};

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
