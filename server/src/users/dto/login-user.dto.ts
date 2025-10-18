import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  MinLength,
  IsEmail,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
