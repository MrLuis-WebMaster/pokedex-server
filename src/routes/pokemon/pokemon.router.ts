import express, { Request, Response, Router } from 'express';

import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { PokemonQueryValidate } from './pokemon.schemas';
import { pokemonService } from './pokemon.service';

export const pokemonRouter: Router = (() => {
  const router = express.Router();

  pokemonService.loadData();

  router.get('/', validateRequest(PokemonQueryValidate), async (req: Request, res: Response) => {
    const { page, pageSize, name } = req.query;
    const serviceResponse = await pokemonService.findAll(
      Number(page) || undefined,
      Number(pageSize) || undefined,
      name as string
    );
    handleServiceResponse(serviceResponse, res);
  });

  router.get('/refresh-data', async (req: Request, res: Response) => {
    const serviceResponse = await pokemonService.refreshData();
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
