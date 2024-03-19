import { PokemonEntity } from '@/database/entity/pokemon.entity';

interface MetaData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface Pokemon {
  name: string;
  order: number;
  color: string;
}

interface PokemonResponse {
  pokemons: PokemonEntity[];
  meta: MetaData;
}

export type { Pokemon, PokemonResponse };
