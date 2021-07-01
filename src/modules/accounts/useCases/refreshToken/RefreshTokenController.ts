import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokeUseCase } from './RefreshTokenUseCase';

class RefreshTokeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokeUseCase);
    console.log(token);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json({ refresh_token });
  }
}

export { RefreshTokeController };
