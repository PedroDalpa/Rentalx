import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUsersRepository';

import { deleteFile } from '../../../../utils/file';

interface IRequest {
  id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}
  async execute({ id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };