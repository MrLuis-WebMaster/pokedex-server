import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { generateAuthToken, PayloadInterface } from '@/common/utils/auth';
import { logger } from '@/server';

export const authService = {
  generateAuthToken: (payload: PayloadInterface): ServiceResponse<string | null> => {
    try {
      const token = generateAuthToken(payload);
      return new ServiceResponse<string>(ResponseStatus.Success, 'Token created', token, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error creating token: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
