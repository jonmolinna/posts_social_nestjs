import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [entityClass, fieldName] =
      validationArguments.constraints as string[];
    const column = { [fieldName]: value };
    const username = column?.username;
    const user = await this.userService.findOneUserByUsername(username);
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Ya existe el usuario';
  }
}

// https://stackoverflow.com/questions/75660359/how-to-add-unique-field-validation-in-nest-js-with-class-validator
