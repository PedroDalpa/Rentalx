import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const carRentalOpen = await this.repository.findOne({ car_id });

    return carRentalOpen;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const userRentalOpen = await this.repository.findOne({ user_id });

    return userRentalOpen;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
