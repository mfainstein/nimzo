export class Item {
    public static itemName: string;
    public static description: string;
    public static shortDescription: string;
    public static bucket: string;

    constructor(private created: Date) {
    }

    uniqueness():string {
        return (new Date().getTime().toString())
    }

}

