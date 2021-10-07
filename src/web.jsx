import './style.css';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'


let element
function component() {
  element = document.createElement("div");

  element.classList.add('hello');
  
  return element;
}

document.body.appendChild(component());

ReactDOM.render(<App/>,element)
