import React, { Component } from 'react';
import TodoList from "./TodoList";
import "./index.css";

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

// Where index.css and TodoList.js components are imported

// Container holds css from originalin that has the container properties for the app

//Todolist.js component imported/used in App.js which is imported/used to index.js which is used in index.html
