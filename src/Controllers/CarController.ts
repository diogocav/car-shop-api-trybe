import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import CarODM from '../Models/CarODM';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService(new CarODM());
  }

  public async register() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.register(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<Response> {
    const cars = await this.service.getAll();
    return this.res.status(200).json(cars);
  }

  public async getById(): Promise<Response> {
    const { id } = this.req.params;
    const regex = /^[0-9a-fA-F]{24}$/;
    if (!regex.test(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    const car = await this.service.getById(id);
    if (!car) {
      return this.res.status(404).json({ message: 'Car not found' });
    }
    return this.res.status(200).json(car);
  }
}
