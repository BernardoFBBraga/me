import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="landing-page-content">
        <header>{"Bernardo Braga"}</header>
        <main>
          <p>I'm a software developer from Brazil.</p>
          <p>
            I am a communicator and a problem solver. Forever in love with language and creativity, I've study work with
            information representation and interpretation, such as real time dashboards, charts, diagrams, ontologies
            and narratives.
          </p>
          <p>
            I've been twice an entrepeneur. Started and led two start-ups through funding pitches, customer
            relationships and product development.
          </p>
          <p>Looking for a cooperative enviroment to create engaging user experiences.</p>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
