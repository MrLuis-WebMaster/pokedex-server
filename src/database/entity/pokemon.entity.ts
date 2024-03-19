import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'pokemons',
  modelName: 'Pokemon',
})
export class PokemonEntity extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare color: string;

  @Unique
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare idPokemon: string;
}
