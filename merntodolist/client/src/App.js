import React, { Component } from 'react';
import "./index.css";
import TodoList from "./TodoList"

class App extends Component {
  render() {
    return (
      <div id="container">
      <TodoList/>
      </div>
    );
  }
}

export default App;

// where the css and TodoList components are connected
// container is for the css that has the container properties for the app
//Todolist component is under it and added into App file which is added to index.js and then showed in index.html from everything being connected to index.js
