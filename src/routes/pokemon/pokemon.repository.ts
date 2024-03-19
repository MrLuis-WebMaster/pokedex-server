import { Op } from 'sequelize';

import { PokemonEntity } from '@/database/entity/pokemon.entity';

import { Pokemon, PokemonResponse } from './pokemon.types';

export const pokemonRepository = {
  findAllAsync: async (page: number = 1, pageSize: number = 10, searchQuery?: string): Promise<PokemonResponse> => {
    let offset = 0;
    let whereClause = {};

    if (page < 1) {
      page = 1;
    }

    if (pageSize < 1) {
      pageSize = 10;
    }

    offset = (page - 1) * pageSize;

    if (searchQuery) {
      whereClause = {
        name: {
          [Op.like]: `%${searchQuery}%`,
        },
      };
    }

    const totalCount = await PokemonEntity.count({ where: whereClause });
    const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

    const pokemons = await PokemonEntity.findAll({
      where: whereClause,
      offset,
      limit: pageSize,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    const meta = {
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return { pokemons, meta };
  },
  createBulkAsync: async (pokemonsData: Pokemon[]): Promise<void> => {
    try {
      const mappedPokemons = pokemonsData.map((pokemon) => ({
        name: pokemon.name,
        order: pokemon.order,
        color: pokemon.color,
        idPokemon: pokemon.order,
      }));
      await PokemonEntity.bulkCreate(mappedPokemons, { updateOnDuplicate: ['name', 'order', 'color', 'idPokemon'] });
    } catch (error) {
      if (error instanceof Error) throw new Error('Error al crear en masa los pokemons: ' + error.message);
    }
  },
};
