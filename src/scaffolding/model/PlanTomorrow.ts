import { Plan } from './Plan';

/**
 * Usually one would like to plan tomorrow before it arrives.
 * @see Plan
 */

export class PlanTomorrow extends Plan {
    public static itemName = "planTomorrow";
    public static shortDescription = "Craft a plan for tomorrow.";
}
