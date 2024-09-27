import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Ingrese un usuario' })
  username: string;

  @IsNotEmpty({ message: 'Ingrese una contraseña' })
  password: string;
}
