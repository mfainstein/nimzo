import { Command } from 'commander';
import { Scaffolding } from '../../scaffolding/Scaffolding';
import { PlopScaffolding } from '../../scaffolding/PlopScaffolding';

/**
 * A command that is using the Scaffolding builder.
 *
 */
export class ScaffoldCommand extends Command {

    constructor(private commandName:string, private commandDescription:string) {
        super();
    }

    init(): void {
        this.description(this.commandDescription);
        this.name(this.commandName);
        this.action(() => {
            this.create();
        });
    }

    create(): void {
        let scaffolding:Scaffolding = new PlopScaffolding();
        scaffolding.build([this.commandName]);
    }
}
