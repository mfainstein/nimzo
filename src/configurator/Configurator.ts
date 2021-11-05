import Conf from 'conf';
import { Config } from './Config';

export class Configurator {
    private config: any;

    constructor() {
        // @ts-ignore
        this.config = new Conf({Config});
    }

    public set(path: string, value: any): void {
        this.config.set(path, value);
    }

    public get(path: string): any {
        return this.config.get(path)
    }


}
