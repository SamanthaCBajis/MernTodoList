import axios from "axios";
// importing axios - HTTP client that works well in both browser and node.js

export const getTodoList = () => {
    return axios
    .get("http://localhost:8080/api/todos", {
        headers:{"Content-Type": "application/json"}
    })
    .then(res => {
        return res.data;
    })
}
// get request to get all data stored in db and send that data to app

export const addTodo = term => {
    return axios
    .post("http://localhost:8080/api/todo", 
    {title: term},
    {
        headers:{"Content-Type": "application/json"}
    })
    .then(res => {
        console.log(res)
    })
}
// post request to add new data into the db

export const deleteTodo = term => {
    axios
    .delete(`http://localhost:8080/api/todo/${term}`, {
        headers:{"Content-Type": "application/json"}
    })
    .then(res => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })
}
// delete request to remove any data that is stored in the db

export const updateItem = (term,id) => {
    return axios
    .put(`http://localhost:8080/api/todo/${id}`, 
    {title: term},
    {
        headers:{"Content-Type": "application/json"}
    })
    .then(res => {
        console.log(res)
    })
}
// update to update any data that is currently in the database


