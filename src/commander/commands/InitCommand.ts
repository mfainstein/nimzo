import { Command } from 'commander';
import { Scaffolding } from '../../scaffolding/Scaffolding';
import { PlopScaffolding } from '../../scaffolding/PlopScaffolding';
import { Configurator } from '../../configurator/Configurator';

export class InitCommand extends Command {
    constructor() {
        super();
        this.description("Initialize the a Nimzo project in the current directory");
        this.name("init");
        this.action(() => {
            this.initialize();
        });
    }

    initialize(): void {
        let configurator = new Configurator();
        configurator.set("projectPath", process.cwd());
        //bootstrapper -> directories builder -> create
        //todos builder-> create
        //ask for an editor with inquierer:
        configurator.set("editor", "webstorm");
    }

}
