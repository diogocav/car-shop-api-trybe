// import KeyFactory from '../Domain/Key/KeyFactory';

import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private carODM: CarODM;

  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll(): Promise<(Car | null)[]> {
    const cars = await this.carODM.findAll();
    const carsFinal = await Promise.all(cars?.map((car) => this.createCarDomain(car)) ?? []);
    return carsFinal;
  }
  
  public async getById(id: string): Promise<Car | null> {
    const car = await this.carODM.findById(id);
    return this.createCarDomain(car);
  }
}
