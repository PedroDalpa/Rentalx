import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UserRepository();

  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError(`User isn't admin!`);
  }

  return next();
}

export { ensureAdmin };
