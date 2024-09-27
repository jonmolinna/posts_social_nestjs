import { IsNotEmpty, Matches, Validate } from 'class-validator';
import { UniqueUsernameValidator } from '../custom-validate/is-unique-constraint';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Ingrese un nombre' })
  name: string;

  @IsNotEmpty({ message: 'Ingrese un usuario' })
  @Matches(/^[A-Za-z][A-Za-z0-9_]{5,20}$/, {
    message: 'Ingrese un usuario válido',
  })
  @Validate(UniqueUsernameValidator, ['users', 'username'])
  username: string;

  @IsNotEmpty({ message: 'Ingrese una contraseña' })
  password: string;
}
