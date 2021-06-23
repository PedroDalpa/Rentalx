import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12',
      car_id: '1',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: 'sameUserId',
      car_id: 'anotherCarId',
      expected_return_date: dayAdd24Hours,
    });

    return expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'sameUserId',
        car_id: 'anotherCarId2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: 'anotherUserId',
      car_id: 'sameCarId',
      expected_return_date: dayAdd24Hours,
    });

    return expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'anotherUserId2',
        car_id: 'sameCarId',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    return expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'Other car',
        car_id: '12hg',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
