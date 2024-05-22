import { DataTypes, Model, Sequelize } from 'sequelize';

class Order extends Model {
  public id!: number;
  public user_id!: number;
  public status!: string;
  public total!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        total: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default Order;
