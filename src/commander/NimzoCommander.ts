import { Command, ParseOptions, program } from 'commander';

export class NimzoCommander extends Command {
    public static description: string = "A minimalistic, distraction free, IDE focused system for the Engineering Manager.";
    public static version:string = "1.0.0"


    constructor() {
        super();
        this.description(NimzoCommander.description)
        this.version(NimzoCommander.version);
    }

    public options() {

    }
}
