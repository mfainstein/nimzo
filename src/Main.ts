#!/usr/bin/env node
import { NimzoCommander } from './commander/NimzoCommander';
import { Command } from 'commander';
import { CreatePlanCommand } from './commander/commands/CreatePlanCommand';

let nimzoCommander:Command = new NimzoCommander();

//load config

nimzoCommander.addCommand(new CreatePlanCommand());
nimzoCommander.parse();

