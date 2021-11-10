import { Command } from 'commander';
import { Configurator } from '../../configurator/Configurator';
import { ConfigKeys } from '../../configurator/Config';
import inquirer from 'inquirer';

/**
 * Initialize a nimzo(witch) project.
 * This includes
 *  * Configurations options
 *  * Bootstrapping
 *      * Structure (folders etc.)
 *      * .nimzo indicator file
 *      * Git
 *      * Cron?
 *
 *
 */
export class InitCommand extends Command {
    constructor() {
        super();
        this.description("Initialize the a Nimzo project in the current directory");
        this.name("init");
        this.action(() => {
            this.initialize();
        });
    }

    //TODO: options should be of type InitializationOptions
    // And they should be formed also to questions.
    initialize(options?:any): void {
        let configurator = new Configurator();
        configurator.set(ConfigKeys.PROJECT_PATH, process.cwd());
        //bootstrapper -> directories builder -> create
        //todos builder-> create

        //TODO: this should also contain "custom"
        //TODO: seperate to intiailization-questions.json
        //TODO: more things to ask: [nick]name ?

        if (!options){
            inquirer.prompt([{
                type: 'list',
                name: 'editor',
                message: 'Enter your code editor command',
                choices: ["vi", "webstorm", "code"]
            }]).then((answer) => {
                configurator.set(ConfigKeys.EDITOR, answer.editor);
            });
        }

    }

}
