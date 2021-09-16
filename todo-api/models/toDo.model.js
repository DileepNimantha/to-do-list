const toDoModel = (sequelize, Sequelize) => {
  const ToDO = sequelize.define('toDo', {
    taskName: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return ToDO;
};

export default toDoModel;
