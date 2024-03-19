import express, { Request, Response, Router } from 'express';

import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { AuthBody } from './auth.schema';
import { authService } from './auth.service';

export const authRouter: Router = (() => {
  const router = express.Router();
  router.post('/generate-token', validateRequest(AuthBody), (req: Request, res: Response) => {
    const { name, email } = req.body;
    const serviceResponse = authService.generateAuthToken({
      name,
      email,
    });
    handleServiceResponse(serviceResponse, res);
  });
  return router;
})();
