import { Command } from 'commander';
import { Persistence } from '../../persistence/Persistence';
import { Git } from '../../persistence/Git';

export class PersistCommand extends Command {
    constructor() {
        super();
        this.description("Persist the current state");
        this.name("persist");
        this.action(() => {
            this.persist();
        });
    }

    public persist():void {
        let git:Persistence = new Git();
        git.load();
        git.save("Save all");
    }

}
