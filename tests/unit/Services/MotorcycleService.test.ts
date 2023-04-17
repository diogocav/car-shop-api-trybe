import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';

describe('Testes de MotorcycleService', function () {
  it('Criando uma motorcycle com SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    });
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Criando uma motorcycleOutput sem SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };

    Sinon.stub(Model, 'create').resolves(null);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(null);
  });

  it('buscando todos as motorcycles', async function () {
    const motorcyclesOutput: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    Sinon.stub(Model, 'find').resolves(motorcyclesOutput);

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getAll();

    expect(result).to.be.deep.equal(motorcyclesOutput);
  });

  it('buscando uma motorcycle com id válido', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    });
    Sinon.stub(Model, 'findById').resolves(motorcycleOutput);
  
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getById('6348513f34c397abcad040b2');
  
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('buscando uma motorcycle com id inválido', async function () {
    try {
      const service = new MotorcycleService(new MotorcycleODM());
      await service.getById('634852326b35b59438');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('buscando uma motorcycle com id inexistente', async function () {
    Sinon.stub(Model, 'findOne').resolves(null);

    try {
      const service = new MotorcycleService(new MotorcycleODM());
      await service.getById('634852326b35b59438fbea3f');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('updating uma motorcycle com id válido', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Biz',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    });
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);
  
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.updateById('6348513f34c397abcad040b2', motorcycleInput);
  
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('updating uma motorcycle com id inválido', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };
    try {
      const service = new MotorcycleService(new MotorcycleODM());
      await service.updateById('634852326b35b59438', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('updating uma motorcycle com id inexistente', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 1000,
    };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const service = new MotorcycleService(new MotorcycleODM());
      await service.updateById('634852326b35b59438fbea3f', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});
