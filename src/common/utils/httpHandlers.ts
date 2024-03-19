import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body, query } = req;
    const props = {
      ...params,
      ...body,
      ...query,
    };
    const instance = new schema(props);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw errors;
    }
    next();
  } catch (err) {
    const statusCode = StatusCodes.BAD_REQUEST;
    res.status(statusCode).send(new ServiceResponse<null>(ResponseStatus.Failed, err as string, null, statusCode));
  }
};
