class PaymentStep {
    async execute(context: any) {
        // Simulate payment request
        console.log(`Processing payment for order ${context.orderId}`);
        // Throw error to simulate failure for rollback testing
        // throw new Error('Payment failed');
    }

    async rollback(context: any) {
        // Simulate payment rollback
        console.log(`Rolling back payment for order ${context.orderId}`);
    }
}

export default PaymentStep;
