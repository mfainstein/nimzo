import { Command } from 'commander';

export class NimzoCommander extends Command {
    public static description: string = "A minimalistic, distraction free, IDE focused system for the Software Engineer / Engineering Manager.";
    public static version:string = "0.0.1"


    constructor() {
        super();
        this.description(NimzoCommander.description)
        this.version(NimzoCommander.version);
    }

    public options() {

    }
}
