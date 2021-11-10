import { Item } from './Item';

/**
 * A log of a decision. Used for future reference, retrospective etc.
 */
export class Decision implements Item {
    dilemma: string;
    decision: string;
    shared: string;
}
