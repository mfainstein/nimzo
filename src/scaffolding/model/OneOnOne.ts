import { Item } from './Item';

/**
 * One on one is a special meeting, usually on a regular basis, to discuss personal & technical aspects.
 */
export class OneOnOne extends Item {
    public static itemName = "1on1";
    public static bucket = "1on1s";
    public static shortDescription = '1on1 note';
    public static description = 'One on one is a special meeting, usually on a regular basis, to discuss personal & technical aspects.';
    public static associateField = "associate";
    public static associateFieldDescription = "Name of associate";

    constructor(private associate:string) {
        super(new Date());
    }
}
