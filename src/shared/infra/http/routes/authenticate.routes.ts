import { Router } from 'express';

import { AuthenticationUserController } from '@modules/accounts/useCases/autenticateUser/AuthenticationUserController';
import { RefreshTokeController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

const authenticationUserController = new AuthenticationUserController();
const refreshTokenController = new RefreshTokeController();

authenticateRoutes.post('/sessions', authenticationUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
