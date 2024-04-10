import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface UserAttributes {
  user_id: string
  first_name: string
  last_name: string
  email: string
  password: string
  phone_number: string
  avatar: string
  role_id: string
  createdAt: Date
  updatedAt: Date
}

interface UserCreationAttribute
  extends Optional<UserAttributes, 'user_id' | 'role_id' | 'avatar' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttribute> implements UserAttributes {
  declare user_id: string
  declare first_name: string
  declare last_name: string
  declare email: string
  declare password: string
  declare phone_number: string
  declare avatar: string
  declare role_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

User.init(
  {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    first_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING
    },
    phone_number: {
      allowNull: true,
      type: DataTypes.STRING
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg'
    },
    role_id: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'bcb8d4a3-1a97-474d-bd1e-1d775e75fp0a'
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'User',
    tableName: 'Users'
  }
)

export default User
