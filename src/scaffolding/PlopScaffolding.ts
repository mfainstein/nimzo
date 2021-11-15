import * as path from 'path';
import { Plop, run } from 'plop';
import { Scaffolding } from './Scaffolding';

/**
 * Scaffold items using plop.
 *
 */
export class PlopScaffolding implements Scaffolding {
    public build(args: string[]): void {
        const argv = require('minimist')(args);
        Plop.launch({
            // In order for `plop` to always pick up the `plopfile.js` despite the CWD, you must use `__dirname`
            configPath: path.join(__dirname, '../../dist/scaffolding/plopfile.js'),
            require: argv.require,
            completion: argv.completion
// This will merge the `plop` argv and the generator argv.
// This means that you don't need to use `--` anymore
        }, env => run(env, undefined, true));
    }
}
