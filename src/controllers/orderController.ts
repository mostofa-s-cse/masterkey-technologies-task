import { Request, Response } from 'express';
import { placeOrder } from '../services/orderService';
import SagaOrchestrator from '../services/sagaOrchestrator';
import PaymentStep from '../services/steps/paymentStep';
import ShippingStep from '../services/steps/shippingStep';
import { DatabaseError, ValidationError } from 'sequelize';

export default {
    async placeOrder(req: Request, res: Response) {
        const { order, items } = req.body;
        try {
            const orderId = await placeOrder(order, items);

            const orchestrator = new SagaOrchestrator();
            orchestrator.addStep(new PaymentStep());
            orchestrator.addStep(new ShippingStep());

            await orchestrator.execute({ orderId });

            res.status(201).json({ orderId });
        } catch (error) {
            console.error('Error placing order:', error);

            if (error instanceof ValidationError) {
                // Handle validation errors
                return res.status(400).json({ error: 'Validation error', details: error.errors });
            } else if (error instanceof DatabaseError) {
                // Handle database errors
                return res.status(500).json({ error: 'Database error', details: error.message });
            } else {
                // Handle other errors
                return res.status(500).json({ error: 'Failed to place order' });
            }
        }
    }
};
