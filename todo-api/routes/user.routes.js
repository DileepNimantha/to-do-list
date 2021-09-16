import express from 'express';
import { fetchUser } from '../controllers/user.controller.js';

const router = express.Router();

const userRoutes = app => {
  // Fetch user
  router.post('/', fetchUser);

  app.use('/api/user', router);
};

export default userRoutes;
