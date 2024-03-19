import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

class AuthBody {
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  constructor(body: any) {
    this.name = body.name;
    this.email = body.email;
  }
}

export { AuthBody };
