const express = require('express');
const Task = require('../models/Task')

const taskRoute = express.Router();

taskRoute.get('', (req, res) => {
    res.render('login', {})
});

taskRoute.post('/task', async (req, res) => {

    const reqBody = req.body;
    const task = new Task(reqBody);
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

taskRoute.get('/task', async (req, res) => {
    
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    } catch( error ) {
        res.status(404).send(error);
    }
});

taskRoute.delete('/task', async (req, res) => {
    const _id = req.body._id;
    try{
        const task= await Task.findOneAndDelete({_id});
        res.send(task);
    } catch(error) {
        res.status(404).send(error);
    }
});

module.exports = taskRoute;
