import { IsInt, IsOptional, IsString, Min } from 'class-validator';

class PokemonQueryValidate {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;

  @IsOptional()
  @IsString()
  name?: string;

  constructor(query: any) {
    this.page = query?.page ? parseInt(query.page) : 1;
    this.pageSize = query?.pageSize ? parseInt(query.pageSize) : 10;
    this.name = query?.name ? query.name : '';
  }
}

export { PokemonQueryValidate };
