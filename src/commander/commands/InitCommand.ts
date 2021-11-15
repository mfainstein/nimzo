import { Configurator } from '../../configurator/Configurator';
import { ConfigKeys } from '../../configurator/Config';
import inquirer from 'inquirer';
import { DirectoriesBuilder } from '../../bootstrapper/DirectoriesBuilder';
import * as path from 'path';
import * as fs from 'fs';
import { Command } from 'commander';
import { Git } from '../../persistence/Git';
import { Persistence } from '../../persistence/Persistence';

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
        this.description("Initialize the a Nimzo project in the current directory.");
        this.name("init");
        this.action(() => {
            this.initialize();
            let git:Persistence = new Git();
            git.load();
            git.save("init");
        });
    }

    //TODO: options should be of type InitializationOptions
    // And they should be formed also to questions.
    initialize(options?: any): void {
        let configurator = new Configurator();
        //todos builder-> create

        //TODO: this should also contain "custom"
        //TODO: seperate to intiailization-questions.json
        //TODO: more things to ask: [nick]name ?
        let currentPath: string = process.cwd();
        let nimzoFilePath:string = path.join(currentPath, ".nimzo")
        if (fs.existsSync(nimzoFilePath)) {
            console.log("Nimzo(witch) is already initialized at this path!");
            return;
        }
        let files = fs.readdirSync(currentPath);
        if (!files || files.length == 0){
            console.log("Directory is not empty! Cannot initialize here");
            return;
        }
        if (!options) {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'nickname',
                    message: 'Enter your nickname',
                },
                {
                    type: 'list',
                    name: 'editor',
                    message: 'Enter your code editor command',
                    choices: ["vi", "webstorm", "code"]
                },
                {
                    type: 'confirm',
                    name: 'init',
                    message: 'Initialize nimzo(witch) system in the current path? (' + process.cwd() + ')',
                }
            ]).then((answer) => {
                configurator.set(ConfigKeys.NICKNAME, answer.nickname);
                configurator.set(ConfigKeys.EDITOR, answer.editor);
                configurator.set(ConfigKeys.PROJECT_PATH, currentPath);

                let directoriesBuilder = new DirectoriesBuilder(currentPath);
                directoriesBuilder.buildBuckets();
                directoriesBuilder.buildNimzoStamp();
                directoriesBuilder.buildData();
            });

        }

    }

}
