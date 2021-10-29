import { Command } from 'commander';
import { Scaffolder } from '../../scaffolder/Scaffolder';

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
        Scaffolder.run(["plan"]);
    }


}
