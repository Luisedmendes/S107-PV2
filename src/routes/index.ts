import { Router } from 'express';
import { userRouter } from './userRouter';

const routes = Router();

export { routes };
routes.use(userRouter);
