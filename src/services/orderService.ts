import { Op } from 'sequelize';
import { sequelize, Order, OrderItem, Inventory } from '../database/index';

export async function placeOrder(order: Order, items: OrderItem[]): Promise<number> {
    const transaction = await sequelize.transaction();
    try {
        // Create the order
        const createdOrder = await Order.create({
            user_id: order.user_id,
            status: 'PENDING',
            total: order.total,
        }, { transaction });

        // Create order items
        for (const item of items) {
            await OrderItem.create({
                order_id: createdOrder.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
            }, { transaction });

            // Update inventory
            const [updatedRows] = await Inventory.update(
                { stock: sequelize.literal(`stock - ${item.quantity}`) },
                { where: { product_id: item.product_id, stock: { [Op.gte]: item.quantity } }, transaction }
                // Here we use Op.gte instead of sequelize.Op.gte
            );

            if (updatedRows === 0) {
                throw new Error('Insufficient stock');
            }
        }

        await transaction.commit();
        return createdOrder.id;
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
}
