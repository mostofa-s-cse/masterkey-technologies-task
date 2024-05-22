import { DataTypes, Model, Sequelize } from 'sequelize';

class Inventory extends Model {
  public product_id!: number;
  public stock!: number;
  public readonly updated_at!: Date;

  public static initModel(sequelize: Sequelize) {
    Inventory.init(
      {
        product_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'inventory',
        timestamps: false,
        underscored: true,
      }
    );
  }
}

export default Inventory;
