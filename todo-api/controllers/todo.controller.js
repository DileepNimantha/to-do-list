// const db = require('../models');
import db from '../models/index.js';
const ToDo = db.toDo;
const Op = db.Sequelize.Op;

// Create and Save a new ToDo
export const create = (req, res) => {
  // Validate request
  if (!req.body.taskName) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Create a ToDo
  const toDo = {
    taskName: req.body.taskName,
    status: req.body.status
  };

  // Save ToDo in the database
  ToDo.create(toDo)
    .then(data => {
      res.send({ data: data, message: 'Created the task successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the task.'
      });
    });
};

// Retrieve all ToDos from the database.
export const findAll = (req, res) => {
  const taskName = req.query.taskName;
  var condition = taskName ? { taskName: { [Op.like]: `%${taskName}%` } } : null;

  ToDo.findAll({ where: condition })
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tasks.'
      });
    });
};

// Find a single ToDo with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  ToDo.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving tasks with id=' + id
      });
    });
};

// Update a ToDo by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  ToDo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (Number(num) === 1) {
        res.send({
          message: 'Updated the task successfully.'
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe ToDo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating task with id=' + id
      });
    });
};

// Delete a ToDo with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.params.id;

  ToDo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (Number(num) === 1) {
        res.send({
          message: 'Deleted the task successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete task with id=${id}. Maybe task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete task with id=' + id
      });
    });
};

// Delete all ToDos from the database.
export const deleteAll = (req, res) => {
  const ids = req.body.ids;

  ToDo.destroy({
    where: { id: ids },
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} tasks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tasks.'
      });
    });
};

// find all published ToDo
export const findAllPublished = (req, res) => {
  ToDo.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tasks.'
      });
    });
};
