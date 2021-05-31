import { Router } from 'express';

import { AuthenticationUserController } from '@modules/accounts/useCases/autenticateUser/AuthenticationUserController';

const authenticateRoutes = Router();

const authenticationUserController = new AuthenticationUserController();

authenticateRoutes.post('/sessions', authenticationUserController.handle);

export { authenticateRoutes };
