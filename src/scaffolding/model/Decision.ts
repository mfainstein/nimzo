import { Item } from './Item';

/**
 * A log of a decision. Used for future reference, retrospective etc.
 */
// TODO: inspired by snowflakes...
export class Decision extends Item {
    public static itemName = "decision";
    public static bucket = "decisions";
    public static shortDescription = 'Decision log.';
    public static description = 'Log your decision for future reference, review and retrospective.';

    public static dilemmaField = "dilemma";
    public static dilemmaFieldDescription = "The dilemma";
    public static decisionField = "decision";
    public static decisionFieldDescription = "The decision";
    public static sharedFiled = "shared";
    public static sharedFieldDDescription = "Shared with";
    /**
     *
     * @param dilemma the dilemma itself
     * @param decision the decision taken
     * @param shared people shared with
     */
    constructor(private dilemma:string, private decision:string, private shared:string[]) {
        super(new Date());
    }
}
