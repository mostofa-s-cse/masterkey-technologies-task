class SagaOrchestrator {
    private steps: any[] = [];

    addStep(step: any) {
        this.steps.push(step);
    }

    async execute(context: any) {
        for (const step of this.steps) {
            try {
                await step.execute(context);
            } catch (e) {
                await this.rollback(context);
                throw e;
            }
        }
    }

    async rollback(context: any) {
        for (const step of this.steps.reverse()) {
            if (step.rollback) {
                await step.rollback(context);
            }
        }
    }
}

export default SagaOrchestrator;
