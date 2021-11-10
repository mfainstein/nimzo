import { Item } from './Item';

/**
 * Meeting notes, summary, and action items.
 * 
 */
export interface Meeting extends Item {
    description: string;
    attendants: string;
}
