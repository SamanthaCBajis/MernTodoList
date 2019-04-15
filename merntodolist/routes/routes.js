const express = require("express");
// requiring express module for routes.js
const routes = express.Router();
// creating the express Router so functions can be routed and used in other files
const mongojs = require("mongojs");
// requiring the mongo database to store these functions and outputs in for application
const db = mongojs(
    "todolist",
    ["todos"]
);
// I think what information is being stored in the mongodb, what the database is expecting to have stored and what data can be manipulated


routes.get("/todos", (req, res) => {
    db.todos.find({}, {_id: 1, title: 1}, (err, todos) => {
        if(err){
            res.send(err);
        }
// to get all the tasks from the database - connecting the database to the server (tasks what connects the server and routes) to find the id and title of the todo then send that data


        let data = [];
        Object.keys(todos).forEach((key) => {
            let val = todos[key];
            data.push([val.title, val._id]);
        });
        res.send(data);
    });
});
// taking the data from the array and returning the array of string elements once (foreach) using Object.keys to the tasks (routes.js then server) 
// key could be the values of just the id and title for that single todo
// the value of the title and id of that todo is then pushed back into the array and that data is resent


routes.post("/todo", (req, res) => {
    let todo = req.body;
    if(!todo.title){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    }else{
        db.todos.save(todo, (err, todo) => {
            if(err) {
                res.send(err);
            }
            res.json(todo);
        });
    }
});
// adding a task from /task URL and having task variable equal to req.body, so if the req.body does not have the title passed to it then send an error or save that task(todo) from the database and send it as json data to be used through the Restful api in the application


routes.delete("/todo/:id", (req, res) => {
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, (err,todo) => {
        if(err){
            res.send(err);
        }
            res.json(todo);
    });
});
// delete a todo by connecting to the server through tasks and removing by the id. from the db through tasks(routes.js to server) remove the id from the mongo db. req.params.id used to connect id to the restful api and bu fully deleted sending that data back as json data


routes.put("/todo/:id", (req, res) => {
    let todo = req.body;
    let updTodo = {};

    if(todo.title){
        updTodo.title = todo.title;
    }

    if(!updTodo){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    }else{
        db.todos.update({_id: mongojs.ObjectId(req.params.id)},
        updTodo,
        {},
        (err, todo) => {
            if(err){
                res.send(err);
            }
            res.json(todo);
        });
    }
});
//updating tasks through task url back to the server? updating by todos id, updating the req.body of the task and letting updTask equal the new array, making the new task and title euqal and if the infromation is not the new updTask then send an error and if it IS then send that updated todo from the db throgh the routes.js to server and update the id in mongo by the req.params.id so it is in the restful api and the information can be sent back as json data to application

module.exports = routes;