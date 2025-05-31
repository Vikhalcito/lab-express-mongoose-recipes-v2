const express = require("express");
const logger = require("morgan");

const mongoose = require ("mongoose");

const app = express();
const Recipes = require("./models/Recipe.model")

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";
mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((error) => console.error("Error connecting to mongo", error))


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) =>{
    const { title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;
    Recipes.create({title, instructions, level, ingredients, image, duration, isArchived, created})
    .then((response) => {
        res.status(201).json(response)
    })
    .catch(error => res.status(500).json(error))
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipes.find()
    .then(response =>{
        res.status(200).json( {message: "all Gucci" , response})
    })
    .catch(error => res.status(500).json(error))
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) =>{
    const {id} = req.params;
    Recipes.findById(id)
    .then(response =>{
        res.status(200).json({message: "aqui tu recetita", response})
    })
    .catch(error => res.status(500).json(error))
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) =>{
    const {id} = req.params;
    const updatedRecipe = req.body;

    Recipes.findByIdAndUpdate(id, updatedRecipe, {new: true})
    .then(response =>{
        res.status(200).json({message: "agregado UwU", response})
    })
    .catch(error => res.status(500).json(error))
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) =>{
    const {id} = req.params
    Recipes.findByIdAndDelete(id)
    .then(response => {
        res.status(200).json({message: "Lo has borrado!!!!"})
    })
    .catch(error => res.status(500).json(error))
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
