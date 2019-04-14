const express = require("express");
// requires express module from node modules
const path = require("path");
//requires path module from node modules - think path-dirname because use it later
const bodyParser = require("body-parser");
// requires body-parser module from node modules

const tasks = require("./routes/routes");
// requiring from the routes folder then to routes file to connect it to this file

const cors = require("cors");
// require cors module from node modules

const port = 5000;
// making port number for server to run on

const app = express();
// creating an instance of express to be used

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);
// using cors module connecting to use module to create the localhost the server will be running to. the browser number is 3000

app.set("views", path.join(__dirname, "views"));
// setting views as aconfiguration variable that sets the folder from which express wil grab the templates and joining path and dirname modules with views
app.set("view engine", "ejs");
// ejs is embedded javascript templates that lets you generate HTML markup with plain JS - pretty much just plain JS and this is setting the view engine to ejs
// to I guess make it so the JS that is written is embedded to work
app.engine("html", require("ejs").renderFile);
// connnecting express to the engine and making the view in HTML requiring ejs to connect JS

app.use(express.static(path.join(__dirname, "client")));
// just showing that folder this will run is what is within the client folder after creating the react app

app.use(bodyParser.json());
// express and use module connecting to body-parser which needs to have the requests made to the body in json format to be connected to the database
app.use(bodyParser.urlencoded({extended: false}));
// telling the bodyParser to use classic encoding so the values can only be string and arrays when the data is returned


app.use("/api", tasks);
// express and use modules connecting to tasks which is is the routes folder and routes file so code can be connected to the Restful API

app.listen(port, function() {
    console.log("Server started on port" + port);
});

// port this server is running on