import { inject, injectable } from 'tsyringe';

import { CarsImagensRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagensRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

import { deleteFile } from '../../../../utils/file';

interface IRequest {
  car_id: string;
  imagens_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagensRepository')
    private carsImagensRepository: CarsImagensRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ car_id, imagens_name }: IRequest): Promise<void> {
    imagens_name.map(async (image) => {
      await this.carsImagensRepository.create(car_id, image);

      await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImageUseCase };
