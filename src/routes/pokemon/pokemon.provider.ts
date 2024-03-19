import axios from 'axios';

interface PokemonSpecie {
  name: string;
  url: string;
}

interface PokemonData {
  name: string;
  color: string;
  order: number;
}

const getPokemonsSpecies = async (): Promise<PokemonSpecie[]> => {
  const pokemonsSpecies = (
    await axios.get<{ pokemon_species: PokemonSpecie[] }>('https://pokeapi.co/api/v2/generation/1')
  ).data.pokemon_species;
  return pokemonsSpecies;
};

const fetchDataForAllPokemonUrls = async (pokemonSpecies: PokemonSpecie[]): Promise<PokemonData[]> => {
  const promises = pokemonSpecies.map(async (pokemon) => {
    const response = await axios.get<{
      name: string;
      order: number;
      color: {
        name: string;
      };
    }>(pokemon.url);
    return {
      name: response.data.name,
      order: response.data.order,
      color: response.data.color.name,
    };
  });

  return Promise.all(promises);
};

const getDataPokemons = async (): Promise<PokemonData[]> => {
  const pokemonSpecies = await getPokemonsSpecies();
  const pokemonData = await fetchDataForAllPokemonUrls(pokemonSpecies);
  return pokemonData;
};

export { getDataPokemons };
