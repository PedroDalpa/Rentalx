import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros/AppError';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExist) {
      throw new AppError('Category already exist!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
