import React from "react";
import ReactIcon from "../assets/logos/react.svg";
import CSS from "../assets/logos/CSS.svg";
import HTML from "../assets/logos/HTML.svg";
import Javascript from "../assets/logos/JavaScript.svg";
import Node from "../assets/logos/Node.svg";
import MongoDB from "../assets/logos/MongoDB.svg";
import Git from "../assets/logos/Git.svg";
import Redux from "../assets/logos/Redux.svg";
import "./Techlist.css"

const Techlist = () => {
  return (
    <>
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
    </>
  );
};

export default Techlist;
