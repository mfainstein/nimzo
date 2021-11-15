import { Items } from '../scaffolding/model/Items';
import * as fs from 'fs';
import * as path from 'path';

export class DirectoriesBuilder {

    constructor(private nimzoPath: string) {
    }

    public buildBuckets() {
        Items.map.forEach((item: any, itemName: string) => {
            let bucket = item.bucket;
            fs.mkdir(path.join(this.nimzoPath, bucket), () => {
            });
        })
    }

    public buildNimzoStamp() {
        fs.writeFile(path.join(this.nimzoPath, ".nimzo"), "nimzo(witch)", () => {

        });
    }

    public buildData() {
        fs.writeFile(path.join(this.nimzoPath, "data.js"), "{\n\n}", () => {

        });
    }
}
