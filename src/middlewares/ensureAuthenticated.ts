import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../erros/AppError';
import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}
async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'secret') as IPayload;
    const usersRepository = new UserRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist!', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}

export { ensureAuthenticated };
