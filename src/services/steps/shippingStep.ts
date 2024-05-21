class ShippingStep {
    async execute(context: any) {
        // Simulate shipping request
        console.log(`Processing shipping for order ${context.orderId}`);
    }

    async rollback(context: any) {
        // Simulate shipping rollback
        console.log(`Rolling back shipping for order ${context.orderId}`);
    }
}

export default ShippingStep;
