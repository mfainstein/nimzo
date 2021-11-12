import { Item } from './Item';

/**
 * Prepare to a specific event/meeting.
 */
export class Prepare extends Item {
    public static itemName = "prepare";
    public static bucket = "preparations";
    public static shortDescription = "Preparation plan/notes for an event";
    public static description = "Lay out your notes and thoughts to prepare for a specific event like " +
        "a meeting, presentation etc."
    public static eventField = "event";
    public static eventFieldDescription = "Event to prepare to."

    constructor(private event: string) {
        super(new Date());
    }


}
