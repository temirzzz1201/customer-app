import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  MinLength,
  IsEmail,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('RU')
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  role: 'client' | 'provider';

  @IsNotEmpty()
  @IsString()
  address: string;
}
