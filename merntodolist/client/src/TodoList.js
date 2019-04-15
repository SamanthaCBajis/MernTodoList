import React, { Component } from "react";
//  importing React
import "./App.css";
// importing the css for this file
import {getList, addToList, deleteItem} from "./TodoFunctions";


// import FlipMove from "react-flip-move";

class TodoList extends Component {
    // defining the component TodoList
    constructor(props) {
        // called before the app is mounted and it is initalizing the local state by assigning an object (called this) to this.state
        super(props);
        // when you need to access variables from the parent class - if call super with props (super(props)) React will make props available across the component through this.props
        this.state = {
            id: "",
            term: "",
            items: [],
        
        };
        // setting the object of the initial state to have properties of an id as a string, term as a string, and the items array (I think aka the todos in the array that were changing)?

        this.onSubmit = this.onSubmit.bind(this);
        // this is binding the onSubmit function to the object of this?
        // we are binding the methods of this (object) and onSubmit (method)
        // you can use this or arrow functions? 

       

        
    }

    componentDidMount(){
        // called immediately after the components are mounted
        // it exectutes before rendering BOTH on the server and client side
        // executed after the first render only on the client side
        // where the state updates should occur and I think the state is changed after some type of method is called
        this.getAll();
        // getAll holds all of the data from the db to have the states change from these methods we are using in this script
    }

    onChange = event => {
        this.setState({term: event.target.value});
    }
    // this method is an event that is triggered when an event is fired by every element that has a value property
    // it is used for the input right now - down there it is binding the onChange method to the this object that the input is creating this.state.term which the state change is presented here

    getAll = () => {
        getList().then(data => {
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
    // getAll method that is taking all of the data from the getList method in the TodoFunctions from the database and then making a promise to pass that data from the getList db method and changing the state of the term string and the items array and responding with that new data in it?

    onSubmit = event => {
        event.preventDefault();
        addToList(this.state.term).then(() => {
            this.getAll();
        })
    }
    // event.preventDefault(); is preventing the browsers default behavior -  so im not sure if its preventing the default behavior of a button while not having this functionality binded to it?
    // calling addToList function that will manipulate the state of the term property and make a promise to return that db data from this.getAll function

    onDelete = (val, event) => {
        event.preventDefault();
        deleteItem(val);

        var data = [...this.state.items];
        data.filter(function(item, index) {
            if(item[1] === val){
                data.splice(index, 1);
            }
        });
        this.setState({items: [...data]});
    }

    getInitialState = () => {
        return {
          condition: false
        }
    }

    handleClick = () => {
        this.setState({
          condition: !this.state.condition
        });
      }
      
 

  
 

    render() {

        return(
            <div className="border">
            <div className="todoListMain">
            <h1>Things To Do</h1>
            <h2>Keep Track of your next todo list here!</h2>
            <div className="header">
            <form>
                <input placeholder="Enter a new Todo" value={this.state.term || ""}
            onChange={this.onChange.bind(this)}></input>
                <button  onClick={this.onSubmit.bind(this)} type="submit">New Todo</button>
            </form>



            <table className="content">
            <tbody> 
                {this.state.items.map((item, index) => (
                    <tr key={index}>
                   <input className="checks" type="checkbox"/> 
                   <label className="strikethrough">{item[0]}</label>
                     
                    <button className="delete"
                    href=""
                    onClick={this.onDelete.bind(this, item[1])}> 
                    Delete</button>   
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