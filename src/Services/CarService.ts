import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CarNotFoundError from '../errors/CarNotFoundError';
import InvalidIdError from '../errors/InvalidIdError';

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
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError('Invalid mongo id');
    }
    const car = await this.carODM.findById(id);
    const carFinal = this.createCarDomain(car);
    if (!carFinal) {
      throw new CarNotFoundError('Car not found');
    }
    return carFinal;
  }

  public async updateById(id: string, car: ICar): Promise<Car | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError('Invalid mongo id');
    }
    const updatedCar = await this.carODM.updateById(id, car);
    const carFinal = this.createCarDomain(updatedCar);
    if (!carFinal) {
      throw new CarNotFoundError('Car not found');
    }
    return carFinal;
  }
}
