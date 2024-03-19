import { Sequelize } from 'sequelize-typescript';

import { env } from '@/common/utils/envConfig';

import { PokemonEntity } from '../entity/pokemon.entity';

const sequelize = new Sequelize({
  database: env.DB_NAME,
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  dialect: 'mysql',
  models: [PokemonEntity],
});

export default sequelize;
