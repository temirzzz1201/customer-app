import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Op } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.userModel.findOne({ where: { id } });
  }

  async findByResetPasswordToken(token: string) {
    return this.userModel.findOne({
      where: { resetPasswordToken: token },
    });
  }

  async create(dto: RegisterUserDto): Promise<Users> {
    const { name, phone, email, password } = dto;
    const existingAdmin = await this.userModel.findOne({
      where: { role: 'admin' },
    });
    const role = existingAdmin ? 'user' : 'admin';
    const hash = await bcrypt.hash(password, 10);

    const isAdmin = !existingAdmin;
    const phoneToSave = isAdmin ? '0000000000' : phone;

    return this.userModel.create({
      name,
      phone: phoneToSave,
      email,
      password: hash,
      role,
    } as any);
  }

  private avatarsPath = path.join(__dirname, '../../uploads/avatars');

  private clearAvatarsFolder() {
    if (!fs.existsSync(this.avatarsPath)) return;

    fs.readdirSync(this.avatarsPath).forEach((file) => {
      const filePath = path.join(this.avatarsPath, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  async updateAvatar(userId: number, filename: string): Promise<Users> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    this.clearAvatarsFolder();

    user.avatar = `/uploads/avatars/${filename}`;
    await user.save();
    return user;
  }

  async deleteAvatar(userId: number) {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    if (user.avatar) {
      const filePath = path.join(this.avatarsPath, path.basename(user.avatar));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      user.avatar = null;
      await user.save();
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async findAll(options?: { excludeRole?: string }): Promise<Users[]> {
    const where = options?.excludeRole
      ? { role: { [Op.ne]: options.excludeRole } }
      : {};
    return this.userModel.findAll({ where });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id.toString());
    if (!user) {
      throw new Error(`Пользователь с id=${id} не найден`);
    }

    await user.destroy();
  }
}
