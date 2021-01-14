const express = require('express');
const router = express.Router();

// Task Model
const Task = require('../models/task');

// GET all Tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// GET all Tasks
router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// ADD a new task
router.post('/', async (req, res) => {
  const { nombre, tipo, celular, email } = req.body;
  const task = new Task({ nombre, tipo, celular, email});
  await task.save();
  res.json({status: 'Saved'});
});

// UPDATE a new task
router.put('/:id', async (req, res) => {
  const {  nombre, tipo, celular, email } = req.body;
  const newTask = { nombre, tipo, celular, email};
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({status: 'Updated'});
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({status: 'Deleted'});
});

module.exports = router;