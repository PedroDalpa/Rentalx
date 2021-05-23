import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    console.log('specificationAlreadyExists');
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    console.log(specificationAlreadyExists);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exist!');
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
