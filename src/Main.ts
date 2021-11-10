#!/usr/bin/env node
import { NimzoCommander } from './commander/NimzoCommander';
import { Command } from 'commander';
import { InitCommand } from './commander/commands/InitCommand';
import scaffoldingConfig from "./commander/scaffold-commands/config.json"
import { ScaffoldCommand } from './commander/scaffold-commands/ScaffoldCommand';
let nimzoCommander:Command = new NimzoCommander();

nimzoCommander.addCommand(new InitCommand());
Object.keys(scaffoldingConfig).forEach((commandName)=>{
    // TODO: fix this ts-ignore with proper typing of the json
    // @ts-ignore
    let description = scaffoldingConfig[commandName].description;
    nimzoCommander.addCommand(new ScaffoldCommand(commandName, description));
})

nimzoCommander.parse();

