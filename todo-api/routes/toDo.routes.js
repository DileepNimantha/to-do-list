import express from 'express';
import {
  create,
  deleteAll,
  deleteOne,
  findAll,
  findOne,
  update
} from '../controllers/todo.controller.js';

const router = express.Router();

const toDoroutes = app => {
  // Create a new ToDo
  router.post('/', create);

  // Retrieve all ToDos
  router.get('/', findAll);

  // Retrieve a single ToDo with id
  router.get('/:id', findOne);

  // Update a ToDo with id
  router.put('/:id', update);

  // Delete a ToDo with id
  router.delete('/:id', deleteOne);

  // Delete all ToDos
  router.post('/delete', deleteAll);

  app.use('/api/toDo', router);
};

export default toDoroutes;
