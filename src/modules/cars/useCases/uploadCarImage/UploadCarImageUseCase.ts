import { inject, injectable } from 'tsyringe';
import { deleteFile } from 'utils/file';

import { CarsImagensRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagensRepository';

interface IRequest {
  car_id: string;
  imagens_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagensRepository')
    private carsImagensRepository: CarsImagensRepository
  ) {}
  async execute({ car_id, imagens_name }: IRequest): Promise<void> {
    imagens_name.map(async (image) => {
      await this.carsImagensRepository.create(car_id, image);

      await deleteFile(`./tmp/cars/${image}`);
    });
  }
}

export { UploadCarImageUseCase };
