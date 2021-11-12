import { Item } from './Item';

/**
 * Meeting notes, summary, and action items.
 */
export class Meeting extends Item {
    public static itemName = "meeting";
    public static bucket = "meetings";
    public static shortDescription = 'Meeting notes.';
    public static description = 'Meeting notes, summary, and action items.';

    public static attendantsField = "attendants";
    public static attendantsFieldDescription = "Names of attendants";
    public static agendaField: "agenda";
    public static agendaFieldDescription = "Meeting description/agenda"

    constructor(private attendants: string[]) {
        super(new Date());
    }
}
