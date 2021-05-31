import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      description: 'Category description test',
      name: 'Category test',
    };

    await createCategoryUseCase.execute(category);

    const categoryExpected = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryExpected).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    const category = {
      description: 'Category description test',
      name: 'Category test',
    };

    await createCategoryUseCase.execute(category);

    // Category already exists
    return expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError);
  });
});
