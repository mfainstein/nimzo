import { exec } from 'child_process';

import { NodePlopAPI } from 'plop';

import { Configurator } from '../configurator/Configurator';

import { ConfigKeys } from '../configurator/Config';

import * as path from 'path';

import fs from 'fs';
import { OneOnOne } from './model/OneOnOne';

//TODO: break into modules
//TODO: path resolver, formatters, generators, etc.
export default function plopFunction(plop: NodePlopAPI): void {
    const templatePath: (itemName: string) => string = (itemName: string) => {
        return `src/scaffolding/templates/${itemName}.hbs`;
    };
    const dataPath: (itemName: string) => string = (itemName: string) => {
        return `src/scaffolding/templates/data/${itemName}.hbs`
    };
    const extension: (itemName:string) => string = (itemName:string) => {
        return `${itemName}.md`
    }

    // ========================================= Helpers =================================================================
    plop.addHelper('projectPath', () => {
            let configurator = new Configurator();
            let nimzoFile = path.join(process.cwd(), ".nimzo");
            if (fs.existsSync(nimzoFile)) {
                return process.cwd();
            } else {
                return configurator.get(ConfigKeys.PROJECT_PATH)
            }
        });
    plop.setHelper('dottedFormat', (text: string) => {
        let parts = text.split(" ");
        return parts.join(".");
    });
    plop.setHelper('hyphenFormat', (text: string) => {
        let parts = text.split(" ");
        return parts.join("-");
    });
    plop.setHelper('parts', (text: string) => {
        let parts = text.split(" ");
        return parts.length;
    });
    plop.setHelper('date', () => {
        return new Date();
    });
    plop.setHelper('unixTime', () => {
        return new Date().getTime();
    });
    plop.setHelper('tomorrowUnixTime', () => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0);
        date.setMilliseconds(0);
        return date.getTime();
    });
    plop.setHelper('shortDate', () => {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear() % 2000;

        return day + "-" + month + "-" + year;
    })
    plop.setHelper('tomorrowShortDate', () => {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        let month = tomorrow.getUTCMonth() + 1; //months from 1-12
        let day = tomorrow.getUTCDate();
        let year = tomorrow.getUTCFullYear() % 2000;

        return day + "-" + month + "-" + year;
    })
    // ======================================= Meeting =================================================================
    plop.setGenerator('meeting', {
        description: 'Meeting notes',
        prompts: [
            {
                type: 'input',
                name: 'attendants',
                message: 'Names of attendants:',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Meeting description/agenda:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'meetings/{{hyphenFormat attendants}}.{{shortDate}}.meeting',
                templateFile: 'src/scaffolding/templates/meeting.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/meeting.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                let shortDate = plop.getHelper("shortDate");
                // @ts-ignore
                let fileName = "meetings/" + format(answers.attendants) + "." + shortDate() + ".meeting"
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== Plan ===================================================================
    plop.setGenerator('plan', {
        description: 'Plan for the day (or the next day)',
        prompts: [],
        actions: [
            {
                type: 'add',
                path: 'plans/{{unixTime}}.plan.md',
                templateFile: 'src/scaffolding/templates/plan.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/plan.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let unixTime = plop.getHelper("unixTime");
                let fileName = "plans/" + unixTime() + ".plan.md"
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== Plan tomorrow ==========================================================
    plop.setGenerator('planTomorrow', {
        description: 'Plan for tomorrow',
        prompts: [],
        actions: [
            {
                type: 'add',
                path: 'plans/{{tomorrowUnixTime}}.plan.md',
                templateFile: 'src/scaffolding/templates/plan.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/plan.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let tomorrowUnixTime = plop.getHelper("tomorrowUnixTime");
                let fileName = "plans/" + tomorrowUnixTime() + ".plan.md"
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== 1on1 ==================================================================
    plop.setGenerator(OneOnOne.name, {
        description: OneOnOne.description,
        prompts: [
            {
                type: 'input',
                name: OneOnOne.associate,
                message: 'Names of associate:',
            }
        ],
        actions: [
            {
                type: 'add',
                path: OneOnOne.bucket + '/{{associate}}.{{shortDate}}.'+extension(OneOnOne.name),
                templateFile: templatePath(OneOnOne.name),
            },
            {
                type: 'append',
                templateFile: dataPath(OneOnOne.name),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let shortDate = plop.getHelper("shortDate");
                // @ts-ignore
                let fileName = +OneOnOne.bucket+"/" + answers.associate + "." + shortDate() + "."+extension(OneOnOne.name)
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== note ==================================================================
    plop.setGenerator('note', {
        description: 'Just a note on any subject',
        prompts: [
            {
                type: 'input',
                name: 'subject',
                message: 'Subject:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'notes/{{hyphenFormat subject}}.note',
                templateFile: 'src/scaffolding/templates/note.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/note.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                // @ts-ignore
                let fileName = "notes/" + format(answers.subject) + ".note"
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== prepare ================================================================
    plop.setGenerator('prepare', {
        description: 'Prepare for something specific',
        prompts: [
            {
                type: 'input',
                name: 'event',
                message: 'Event to prepare to:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'prepare/{{hyphenFormat event}}.prepare',
                templateFile: 'src/scaffolding/templates/prepare.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/prepare.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                // @ts-ignore
                let fileName = "prepare/" + format(answers.event) + ".prepare";
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== log ====================================================================
    plop.setGenerator('log', {
        description: 'Log to track the day...',
        prompts: [],
        actions: [
            {
                type: 'add',
                path: 'logs/{{shortDate}}.log',
                templateFile: 'src/scaffolding/templates/log.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/log.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let shortDate = plop.getHelper("shortDate");
                let fileName = "logs/" + shortDate() + ".log"
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ======================================== to do ==================================================================
    plop.setGenerator('TODOWork', {
        description: 'Add a todo work related',
        prompts: [
            {
                type: 'input',
                name: 'todo',
                message: 'TODO what?:',
            },
        ],
        actions: [
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let fileName = "todo/work.todo"
                // @ts-ignore
                exec("echo " + answers.todo + " >> " + fileName);
                return "";
            },
        ]
    });
    // ======================================== decision ===============================================================
    plop.setGenerator('decision', {
        description: 'log a decision',
        prompts: [
            {
                type: 'input',
                name: 'dilemma',
                message: 'The dilemma:',
            },
            {
                type: 'input',
                name: 'decision',
                message: 'The decision:',
            },
            {
                type: 'input',
                name: 'shared',
                message: 'Shared with:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'decisions/{{hyphenFormat dilemma}}.decision',
                templateFile: 'src/scaffolding/templates/decision.hbs',
            },
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/decision.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                // @ts-ignore
                let fileName = "decisions/" + format(answers.dilemma) + ".decision"
                exec("webstorm " + fileName);
                return "";
            },
        ],
    });
    // ========================================= deep work start =======================================================
    plop.setGenerator('deepWork', {
        description: 'start a deep work session',
        prompts: [
            {
                type: 'input',
                name: 'subject'
            },
        ],
        actions: [
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/deep-work-start.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                const {exec} = require('child_process');
                exec("node scripts/focus-mode-turn-on.mjs");
                return "";
            },
        ],
    });
    // ========================================= deep work end =======================================================
    plop.setGenerator('deepWorkEnd', {
        description: 'end a deep work session',
        prompts: [],
        actions: [
            {
                type: 'append',
                templateFile: 'src/scaffolding/templates/data/deep-work-end.hbs',
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
        ],
    });
};
