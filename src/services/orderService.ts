import pool from '../database/db';
import { Order, OrderItem } from '../models';

export async function placeOrder(order: Order, items: OrderItem[]): Promise<number> {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const res = await client.query(
            'INSERT INTO orders(user_id, status, total) VALUES($1, $2, $3) RETURNING id',
            [order.user_id, 'PENDING', order.total]
        );
        const orderId = res.rows[0].id;

        for (const item of items) {
            await client.query(
                'INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );
            const updateRes = await client.query(
                'UPDATE inventory SET stock = stock - $1 WHERE product_id = $2 AND stock >= $1 RETURNING stock',
                [item.quantity, item.product_id]
            );
            if (updateRes.rowCount === 0) {
                throw new Error('Insufficient stock');
            }
        }

        await client.query('COMMIT');
        return orderId;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
