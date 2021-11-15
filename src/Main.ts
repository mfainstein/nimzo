#!/usr/bin/env node
import { NimzoCommander } from './commander/NimzoCommander';
import { Command } from 'commander';
import { InitCommand } from './commander/commands/InitCommand';
import { ScaffoldCommand } from './commander/scaffold-commands/ScaffoldCommand';
import { Items } from './scaffolding/model/Items';
import { PersistCommand } from './commander/commands/PersistCommand';
let nimzoCommander:Command = new NimzoCommander();

nimzoCommander.addCommand(new InitCommand());
Items.map.forEach((item:any, itemName:string)=>{
    let description = item.shortDescription;
    nimzoCommander.addCommand(new ScaffoldCommand(itemName, description))
})
nimzoCommander.addCommand(new PersistCommand());
nimzoCommander.parse();

