import { Item } from './Item';

/**
 * A simple note for anything.
 */
export class Note extends Item {
    public static itemName = "note";
    public static bucket = "notes";
    public static shortDescription = 'A note on any subject.';
    public static description = 'A simple note for anything, on any subject.';
    public static subjectField = "subject";
    public static subjectFieldDescription = "The Note's subject";

    constructor(private subject:string) {
        super(new Date());
    }
}
