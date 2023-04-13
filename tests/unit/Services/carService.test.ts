import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import CarODM from '../../../src/Models/CarODM';

// const RESULT_ERROR = 'Invalid Key';

describe('Testes de CarService', function () {
  it('Criando um car com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    Sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService(new CarODM());
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Criando um car sem SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'create').resolves(null);

    const service = new CarService(new CarODM());
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(null);
  });

  it('buscando todos os carros', async function () {
    const carsOutput: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    Sinon.stub(Model, 'find').resolves(carsOutput);

    const service = new CarService(new CarODM());
    const result = await service.getAll();

    expect(result).to.be.deep.equal(carsOutput);
  });

  it('buscando um carro com id válido', async function () {
    const carOutput: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    });
    Sinon.stub(Model, 'findById').resolves(carOutput);
  
    const service = new CarService(new CarODM());
    const result = await service.getById('634852326b35b59438fbea2f');
  
    expect(result).to.be.deep.equal(carOutput);
  });

  afterEach(function () {
    Sinon.restore();
  });
});
