import { Plan } from './Plan';
import { Decision } from './Decision';
import { Log } from './Log';
import { Meeting } from './Meeting';
import { Note } from './Note';
import { OneOnOne } from './OneOnOne';
import { Prepare } from './Prepare';
import { Item } from './Item';
import { PlanTomorrow } from './PlanTomorrow';

/**
 * Maps scaffolding command name to the Class representing it.
 *
 */
export class Items {
    public static map:Map<string, any> = new Map<string, any>(
        [
            ["plan", Plan],
            ["planTomorrow", PlanTomorrow],
            ["log", Log],
            ["meeting", Meeting],
            ["note", Note],
            ["1on1", OneOnOne],
            ["prepare", Prepare],
            ["decision", Decision]
        ]
    )
}
