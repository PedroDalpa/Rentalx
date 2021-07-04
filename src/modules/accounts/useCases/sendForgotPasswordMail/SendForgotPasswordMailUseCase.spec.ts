import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/mailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send forgot mail useCase', () => {
  beforeEach(() => {
    usersRepository = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      driver_license: '43849',
      email: 'pedro@gmail.com',
      name: 'pedro',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('pedro@gmail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password mail if user does not exist', async () => {
    await expect(async () => {
      await sendForgotPasswordMailUseCase.execute('pedro@gmail.com');
    }).rejects.toEqual(new AppError('User does not exist!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepository.create({
      driver_license: '43849',
      email: 'pedro@gmail.com',
      name: 'pedro',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('pedro@gmail.com');

    expect(generateTokenMail).toBeCalled();
  });
});
