import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).register(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAll(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getById(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).register(),
);

export default routes;
