import Conf from 'conf';
import { Config, ConfigKeys } from './Config';

export class Configurator {
    private config: Conf;

    constructor() {
        // @ts-ignore
        this.config = new Conf({Config});
    }

    public set(key: ConfigKeys, value: any): void {
        this.config.set(key, value);
    }

    public get(key: ConfigKeys): any {
        return this.config.get(key);
    }

}
