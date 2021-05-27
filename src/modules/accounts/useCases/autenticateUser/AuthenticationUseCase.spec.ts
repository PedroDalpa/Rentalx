import { AppError } from '../../../../erros/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

let authenticationUserUseCase: AuthenticationUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticationUserUseCase = new AuthenticationUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001',
      email: 'user@gmail.com',
      password: '1234',
      name: 'User test',
    };
    await createUserUseCase.execute(user);

    const result = await authenticationUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    return expect(
      authenticationUserUseCase.execute({
        email: 'false@gmail.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001',
      email: 'user@gmail.com',
      password: '1234',
      name: 'User test',
    };
    await createUserUseCase.execute(user);
    return expect(
      authenticationUserUseCase.execute({
        email: 'user@gmail.com',
        password: 'invalid',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
