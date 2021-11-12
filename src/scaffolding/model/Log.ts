import { Item } from './Item';

/**
 * A generic daily log (usually for time usage).
 */
// TODO: quote from effective executive regarding logging time?
export class Log extends Item {
    public static itemName = "log";
    public static bucket = "logs";
    public static shortDescription = 'Daily log.';
    public static description = 'Log your time. You only know where your time goes when you systematically log it.';

    constructor() {
        super(new Date());
    }

}
