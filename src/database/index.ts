import sequelize from '../database/config';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import Inventory from '../models/inventory';
import Product from '../models/product';

// Initialize all models
Order.initModel(sequelize);
OrderItem.initModel(sequelize);
Inventory.initModel(sequelize);
Product.initModel(sequelize);

// Sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export { sequelize, syncDatabase, Order, OrderItem, Inventory };

