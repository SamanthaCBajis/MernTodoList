import React, { Component } from 'react';
// imported React

import TodoList from "./TodoList";
// imported TodoList component

import "./index.css";
// imported index.css

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

// Where index.css and TodoList.js components are imported into app

// Container holds css from index.css that has the container properties for the app

// Todolist.js component imported/used in App.js which is imported/used to index.js which is used in index.html
