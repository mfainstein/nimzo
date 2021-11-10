import { Item } from './Item';

/**
 * Prepare to a specific even/meeting.
 */
export interface Prepare extends Item {
    event: string;
}
