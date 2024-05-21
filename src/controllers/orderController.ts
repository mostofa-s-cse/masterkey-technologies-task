import { Request, Response } from 'express';
import { placeOrder } from '../services/orderService';
import SagaOrchestrator from '../services/sagaOrchestrator';
import PaymentStep from '../services/steps/paymentStep';
import ShippingStep from '../services/steps/shippingStep';

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
        } catch (e) {
            res.status(500).json({ error: 'Failed to place order' });
        }
    }
};
