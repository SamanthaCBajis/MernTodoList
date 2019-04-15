import React, { Component } from "react";
//  importing React

import "./App.css";
// importing the css for this file

import {getTodoList, addTodo, deleteTodo} from "./TodoFunctions";
// importing the requests that will allow us to alter the data in the list in the database



class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            term: "",
            items: [],
        
        };
        // defining the component TodoList
        // called before the app is mounted and it is initalizing the local state by assigning an object (called this) to this.state
        // when you need to access variables from the parent class - if call super with props (super(props)) React will make props available across the component through this.props
        // setting the object of the initial state to have properties of an id as a string, term as a string, and the items array

        
        this.onSubmit = this.onSubmit.bind(this);
        // this is binding the onSubmit function to the object of this?
        // we are binding the methods of this (object) and onSubmit (method)
        
    }

    componentDidMount(){
        this.getData();
    }
    // called immediately after the components are mounted
    // it exectutes before rendering BOTH on the server and client side
    // executed after the first render only on the client side
    // where the state updates should occur
    // getData holds all of the data from the db to have the states change from these methods we are using in this script

    onChange = event => {
        this.setState({term: event.target.value});
    }
    // this method is triggered when an event is fired by every element that has a value property
    // it is used for the input right now - down there it is binding the onChange method to the this object that the input is creating this.state.term which the state change is presented here

    getData = () => {
        getTodoList().then(data => {
            this.setState({
                term: "",
                items: [...data],
            },
            () => {
                console.log(this.state.items);
            }
            );
        });
    }
    // getData method that is taking all of the data from the getTodoList method in the TodoFunctions.js from the database and then making a promise to pass that data from the getTodoList db method and changing the state of the term string and the items array and responding with that new data in it

    onSubmit = event => {
        event.preventDefault();
        addTodo(this.state.term).then(() => {
            this.getData();
        })
    }
    //event.preventDefault(); is preventing the browsers default behavior
    // calling addTodo that will manipulate the state of the term property and make a promise to return that db data from this.getData

    onDelete = (val, event) => {
        event.preventDefault();
        deleteTodo(val);

        let data = [...this.state.items];
        data.filter(function(item, index) {
            if(item[1] === val){
                data.splice(index, 1);
               return true;
            }else{
                return false;
            }
        });
        this.setState({items: [...data]});
    }


    
    render() {

        return(
            <div className="notepad">
            <div className="todoList">
            <h1>Things To Do</h1>
            <h2>Keep Track of your next todo list here!</h2>
            <div className="header">
            <form>
                <input placeholder="Enter a new todo" value={this.state.term || ""}
            onChange={this.onChange.bind(this)}></input>
                <button className="submitbtn"  onClick={this.onSubmit.bind(this)} type="submit">New Todo</button>
            </form>
            <table>
            <tbody> 
                {this.state.items.map((item, index) => (
                    <tr key={index}>
                   <td><input className="todos" type="checkbox"/> 
                   <label className="strikethrough">{item[0]}</label>
                    </td>   
                    <td className="delsize">
                    <button className="deletebtn"
                    href=""
                    onClick={this.onDelete.bind(this, item[1])}> 
                    Delete</button>
                    </td>
               </tr>
                ))}
            </tbody> 
            </table>
        </div>
     </div>
     </div>
  
        );
    }
}

export default TodoList;