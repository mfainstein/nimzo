import { exec } from 'child_process';
import { Configurator } from '../configurator/Configurator';
import { ConfigKeys } from '../configurator/Config';
import { Persistence } from './Persistence';

export class Git implements Persistence {
    public save(message: string) {
        let configurator:Configurator = new Configurator();
        let projectPath:string = configurator.get(ConfigKeys.PROJECT_PATH);
        let originalPath:string = process.cwd();
        //TODO: check that this is a git repository.
        process.chdir(projectPath);
        exec("git add --all");
        exec("git commit -m '" + message + "'")
        exec("git push");
        process.chdir(originalPath);
    }

    public load() {
        let configurator = new Configurator();
        let projectPath = configurator.get(ConfigKeys.PROJECT_PATH);
        let originalPath:string = process.cwd();
        process.chdir(projectPath);
        exec("git pull");
        process.chdir(originalPath);
    }
}
