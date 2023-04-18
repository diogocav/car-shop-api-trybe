import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const MOTORCYCLES_ID = '/motorcycles/:id';

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

routes.delete(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).deleteById(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).register(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);
  
routes.get(
  MOTORCYCLES_ID,
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

routes.put(
  MOTORCYCLES_ID,
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

routes.delete(
  MOTORCYCLES_ID,
  (req, res, next) => new MotorcycleController(req, res, next).deleteById(),
);

export default routes;
