import { Router } from 'express';
import CarController from '../Controllers/CarController';
// import TransferController from '../Controllers/TransferController';
// import TransferService from '../Services/TransferService';
// import PaymentODM from '../Models/PaymentODM';
// import KeyService from '../Services/KeyService';
// import KeyODM from '../Models/KeyODM';

const routes = Router();

// const service = new TransferService(
//   new PaymentODM(), 
//   new KeyService(new KeyODM()),
// );
// const transferController = new TransferController(service);

// routes.post(
//   '/transfer',
//   (req, res, next) => transferController.create(req, res, next),
// );

// routes.patch(
//   '/transfer/:id',
//   (req, res, next) => transferController.undoTransfer(req, res, next),
// );

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

export default routes;
