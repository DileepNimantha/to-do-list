import toDoroutes from './toDo.routes.js';
import userRoutes from './user.routes.js';

const routes = app => {
  toDoroutes(app);
  userRoutes(app);
};

export default routes;
