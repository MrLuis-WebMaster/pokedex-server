import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { getDataPokemons } from './pokemon.provider';
import { pokemonRepository } from './pokemon.repository';
import { PokemonResponse } from './pokemon.types';

export const pokemonService = {
  loadData: async () => {
    const pokemonsFromExternalService = await getDataPokemons();
    await pokemonRepository.createBulkAsync(pokemonsFromExternalService);
  },
  findAll: async (
    page: number = 1,
    pageSize: number = 10,
    searchQuery?: string
  ): Promise<ServiceResponse<PokemonResponse | null>> => {
    try {
      const pokemons = await pokemonRepository.findAllAsync(page, pageSize, searchQuery);
      return new ServiceResponse<PokemonResponse>(ResponseStatus.Success, 'Pokemons found', pokemons, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all pokemons: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  refreshData: async (): Promise<ServiceResponse<PokemonResponse | null>> => {
    try {
      const pokemonsFromExternalService = await getDataPokemons();
      await pokemonRepository.createBulkAsync(pokemonsFromExternalService);
      const pokemons = await pokemonRepository.findAllAsync();

      return new ServiceResponse<PokemonResponse>(ResponseStatus.Success, 'Pokemons found', pokemons, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all pokemons: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
