const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

//  Load in the mongoose models
const { List, Task } = require('./db/modules/index.js');

//  Load middleware
app.use(bodyParser.json());

// ROUTE HANDLERS

// LIST ROUTES
// 
// GET /lists
// purpose Get all lists
//  
app.get('/lists', (req, res) => {
    // we want to return an array of all the lists from the database
    List.find({}).then((lists) => {
        res.send(lists);
    });
});

// 
// POST /lists
// Purpose: create a list
// 
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    // the list information (fields) will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
});

// 
// PATH /lists/:id
// Purpose: Updade a specofoed list 
// 
app.patch('/lists/:id', (req, res) => {
    //  We want to update a the specified list  (list document with id in the URL) with thenew values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

// 
// DELETE /lists/:id
// Purpose: Delete a list
// 
app.delete('/lists/:id', (req, res) => {
    //  We want to delete the specified list (document with id in the URL)
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removeListDoc) => {
        res.send(removeListDoc);
    });
});

// 
// GET /lists/:listId/tasks
// Purpose: Get all tasks in  a spefici list
// 
app.get('/lists/:listId/tasks', (req, res) => {
    // We want to return all tasks that belong to a specific list 
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
})

// 
// POST /lists/:listId/takss
// Purpose: Create a new task in a new specific list
// 
app.post('/lists/:listId/tasks', (req, res) => {
    // We want to create a new task in a list specified by listId 
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    });
});

// 
// PATCH /lists/:listId/tasks/:taskId
// Purpose: Update an existing task
// 
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

// 
// DELETE /list/:listId/tasks/:taskId
// Purpose: Delete a task
// 
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((remmovedTaskDoc) => {
        res.send(remmovedTaskDoc);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});