import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
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
  declare name: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare phone: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  declare password: string;

  @Default('client')
  @Column(DataType.ENUM('client', 'provider'))
  declare role: 'client' | 'provider';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare resetPasswordToken: string | null;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  declare resetPasswordExpires: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare avatar: string | null;

  @Column({ type: DataType.FLOAT, allowNull: true })
  declare lat: number | null;

  @Column({ type: DataType.FLOAT, allowNull: true })
  declare lon: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare address: string | null;
}
