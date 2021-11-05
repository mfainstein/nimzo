import * as path from 'path';
import { Plop, run } from 'plop';
import { Scaffolding } from './Scaffolding';

export class PlopScaffolding implements Scaffolding {
    public build(args: string[]): void {
        const argv = require('minimist')(args);
        console.log(path.join(__dirname+"/../../", 'plopfile.cjs'));
        console.log(process.cwd());
        Plop.launch({
            cwd: process.cwd(),
            // In order for `plop` to always pick up the `plopfile.js` despite the CWD, you must use `__dirname`
            configPath: path.join(__dirname+"/../../", 'plopfile.cjs'),
            require: argv.require,
            completion: argv.completion
// This will merge the `plop` argv and the generator argv.
// This means that you don't need to use `--` anymore
        }, env => run(env, undefined, true));
    }
}
