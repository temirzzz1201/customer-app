import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  password: string;

  @Default('client')
  @Column(DataType.ENUM('client', 'provider'))
  role: 'client' | 'provider';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resetPasswordToken: string | null;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  resetPasswordExpires: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string | null;

  @Column({ type: DataType.FLOAT, allowNull: true })
  declare lat: number | null;

  @Column({ type: DataType.FLOAT, allowNull: true })
  declare lon: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare address: string | null;
}
