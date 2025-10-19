import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mailer/email.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { Users } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    const user = await this.usersService.create(dto);
    return this.createToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.createToken(user);
  }

  private createToken(user: Users) {
    const payload = { id: user.id, role: user.role, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    };
  }

  async createPasswordLink(user: Users) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const tokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await this.mailService.sendMail(
      user.email,
      'Ссылка для восстановления пароля, действует 1 час!',
      resetUrl,
      `<a href="${resetUrl}">Перейти, что бы восстановить</a>`,
    );
  }

  async findByResetPasswordToken(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return this.usersService.findByResetPasswordToken(hashedToken);
  }
}
