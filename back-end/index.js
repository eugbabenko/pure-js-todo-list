const express = require("express")
const uuidv4 = require("uuid")
const morgan = require('morgan')

let todos = []
const PORT = 3001

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/todos", (req, res) => {
    res.json(todos)
})

app.get("/todos/:id", (req, res) => {
    const todo = todos.find(todo => todo.id === req.params.id);

    if(!todo) {
        res.status(404);
        res.json({
            error: "Todo was not found"
        });
        return;
    }

    res.json(todo)
})

app.put("/todos/:id", (req, res) => {
    const todo = todos.find(todo => todo.id === req.params.id);

    if(!todo) {
        res.status(404);
        res.json({
            error: "Todo was not found"
        });
        return;
    }

    if(!req.body.title) {
        res.status(400);
        res.json({
            error: "Title should be provided"
        });
        return;
    }

    if(!('isCompleted' in req.body)) {
        res.status(400);
        res.json({
            error: "isCompleted flag should be provided"
        });
        return;
    }

    const updatedTodo = {...todo, title: req.body.title, isCompleted: req.body.isCompleted};

    todos = [...todos.filter(t => t.id !== req.params.id), updatedTodo]

    res.json(updatedTodo)
})

app.post("/todos", (req, res) => {
    if(!req.body.title) {
        res.status(400);
        res.json({
            error: "Title should be provided"
        });
        return;
    }

    const todo = {
        id: uuidv4.v4(),
        title: req.body.title,
        isCompleted: false,
        createdAt: new Date().toISOString().slice(0, 10)
    }

    todos.push(todo)
    res.json(todo)
})

app.delete("/todos/:id", (req, res) => {
    const todo = todos.find(todo => todo.id === req.params.id);

    if(!todo) {
        res.status(404);
        res.json({
            error: "Todo was not found"
        });
        return;
    }

    todos = todos.filter(t => t.id !== req.params.id);

    res.json(todo)
})

app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`)
})
