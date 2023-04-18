import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import InvalidIdError from '../errors/InvalidIdError';
import NotFoundError from '../errors/NotFoundError';

const INVALID_MONGO_ID = 'Invalid mongo id';
const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
export default class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor(motorcycleODM: MotorcycleODM) {
    this.motorcycleODM = motorcycleODM;
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async register(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll(): Promise<(Motorcycle | null)[]> {
    const motorcycles = await this.motorcycleODM.findAll();
    const motorcyclesFinal = await Promise.all(motorcycles?.map(
      (motorcycle) => this.createMotorcycleDomain(motorcycle),
    ) ?? []);
    return motorcyclesFinal;
  }
  
  public async getById(id: string): Promise<Motorcycle | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError(INVALID_MONGO_ID);
    }
    const motorcycle = await this.motorcycleODM.findById(id);
    const motorcyclesFinal = this.createMotorcycleDomain(motorcycle);
    if (!motorcyclesFinal) {
      throw new NotFoundError(MOTORCYCLE_NOT_FOUND);
    }
    return motorcyclesFinal;
  }

  public async updateById(id: string, motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError(INVALID_MONGO_ID);
    }
    const updatedMotorcycle = await this.motorcycleODM.updateById(id, motorcycle);
    const motorcyclesFinal = this.createMotorcycleDomain(updatedMotorcycle);
    if (!motorcyclesFinal) {
      throw new NotFoundError(MOTORCYCLE_NOT_FOUND);
    }
    return motorcyclesFinal;
  }

  public async deleteById(id: string): Promise<void> {
    const regexId = /^[0-9a-fA-F]{24}$/;
    if (!regexId.test(id)) {
      throw new InvalidIdError(INVALID_MONGO_ID);
    }
    const deletedMotorcycle = await this.motorcycleODM.deleteById(id);
    const motorcyclesFinal = this.createMotorcycleDomain(deletedMotorcycle);
    if (!motorcyclesFinal) {
      throw new NotFoundError(MOTORCYCLE_NOT_FOUND);
    }
  }
}
