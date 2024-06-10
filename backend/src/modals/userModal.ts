// models/User.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class User extends Model {
  public email!: string;
  public password!: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'users', // Name of your database table
  }
);

export default User;
