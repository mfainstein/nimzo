import { Item } from './Item';

/**
 * Each day has a plan. Most commonly today's and tomorrow's plans are laid out in the evening before, in the morning or
 * during the day.
 * Some great people like John Carmack used to publish their daily .plan publicly.
 */
export class Plan extends Item {
   public static itemName = "plan";
   public static bucket = "plans";
   public static shortDescription = "Craft a plan for today";
   public static description = "Each day has a plan. " +
       "Most commonly today's and tomorrow's plans are laid out in the evening before, in the morning or during the day."

   constructor() {
      super(new Date());
   }
}
