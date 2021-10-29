import * as path from 'path';
import { Plop, run } from 'plop';

export class Scaffolder {
    public static run(args: string[]): void {
        const argv = require('minimist')(args);
        console.log(path.join(__dirname+"/../../", 'plopfile.cjs'));
        Plop.launch({
            cwd: argv.cwd,
            // In order for `plop` to always pick up the `plopfile.js` despite the CWD, you must use `__dirname`
            configPath: path.join(__dirname+"/../../", 'plopfile.cjs'),
            require: argv.require,
            completion: argv.completion
// This will merge the `plop` argv and the generator argv.
// This means that you don't need to use `--` anymore
        }, env => run(env, undefined, true));
    }
}
