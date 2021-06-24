import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalByUser;
  }
}

export { ListRentalByUserUseCase };
