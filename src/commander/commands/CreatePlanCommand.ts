import { Command } from 'commander';
import { Scaffolding } from '../../scaffolding/Scaffolding';
import { PlopScaffolding } from '../../scaffolding/PlopScaffolding';

export class CreatePlanCommand extends Command {

    constructor() {
        super();
        this.description("Create a .plan file");
        this.name("plan");
        this.action(() => {
            this.createPlan();
        });
    }

    createPlan(): void {
        let scaffolding:Scaffolding = new PlopScaffolding();
        scaffolding.build(["plan"]);
    }


}
