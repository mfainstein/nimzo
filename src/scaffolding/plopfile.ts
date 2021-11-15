import { exec } from 'child_process';

import { NodePlopAPI } from 'plop';

import { Configurator } from '../configurator/Configurator';

import { ConfigKeys } from '../configurator/Config';

import * as path from 'path';

import fs from 'fs';
import { OneOnOne } from './model/OneOnOne';
import { Plan } from './model/Plan';
import { Note } from './model/Note';
import { Prepare } from './model/Prepare';
import { Log } from './model/Log';
import { Decision } from './model/Decision';
import { Meeting } from './model/Meeting';
import { PlanTomorrow } from './model/PlanTomorrow';
import { Git } from '../persistence/Git';

//TODO: break into modules
//TODO: path resolver, formatters, generators, etc.
export default function plopFunction(plop: NodePlopAPI): void {
    const templatePath: (itemName: string) => string = (itemName: string) => {
        return `templates/${itemName}.hbs`;
    };
    const dataPath: (itemName: string) => string = (itemName: string) => {
        return `templates/data/${itemName}.hbs`
    };
    const extension: (itemName: string) => string = (itemName: string) => {
        return `${itemName}.md`
    }

    // ========================================= Helpers =================================================================
    plop.setHelper("editorCommand", () => {
        let configurator = new Configurator();
        return configurator.get(ConfigKeys.EDITOR);
    });
    plop.setHelper('projectPath', () => {
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
    /**
     * TODO: should be maybe dayDate?
     */
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
    plop.setGenerator(Meeting.itemName, {
        description: Meeting.shortDescription,
        prompts: [
            {
                type: 'input',
                name: Meeting.attendantsField,
                message: Meeting.attendantsFieldDescription,
            },
            {
                type: 'input',
                name: Meeting.agendaField,
                message: Meeting.agendaFieldDescription,
            },
        ],
        actions: [
            {
                type: 'add',
                path: Meeting.bucket + '/{{hyphenFormat attendants}}.{{shortDate}}.' + extension(Meeting.itemName),
                templateFile: templatePath(Meeting.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(Meeting.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                let shortDate = plop.getHelper("shortDate");
                // @ts-ignore
                let fileName = Meeting.bucket + "/" + format(answers.attendants) + "." + shortDate() + "." + extension(Meeting.itemName)
                exec(plop.getHelper("editorCommand")() + "  " + +fileName);
                return "";
            },
        ],
    });
    // ======================================== Plan ===================================================================
    plop.setGenerator(Plan.itemName, {
        description: Plan.shortDescription,
        prompts: [],
        actions: [
            {
                type: 'add',
                path: '{{projectPath}}/' + Plan.bucket + '/{{shortDate}}.' + extension(Plan.itemName),
                templateFile: templatePath(Plan.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(Plan.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: '{{projectPath}}/data.js',
            },
            function customAction(answers) {
                let shortDate = plop.getHelper("shortDate");
                let projectPath = plop.getHelper("projectPath");
                let fileName = projectPath() + "/" + Plan.bucket + "/" + shortDate() + "." + extension(Plan.itemName)
                console.log(fileName);
                exec(plop.getHelper("editorCommand")() + " " + fileName);
                return "";
            },
        ],
    });
    // ======================================== Plan tomorrow ==========================================================
    // TODO: probably would like to support a general plan for a specific date
    plop.setGenerator(PlanTomorrow.itemName, {
        description: PlanTomorrow.shortDescription,
        prompts: [],
        actions: [
            {
                type: 'add',
                path: PlanTomorrow.bucket + '/{{tomorrowUnixTime}}.' + extension(PlanTomorrow.itemName),
                templateFile: templatePath(PlanTomorrow.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(PlanTomorrow.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let tomorrowUnixTime = plop.getHelper("tomorrowUnixTime");
                let fileName = PlanTomorrow.bucket + "/" + tomorrowUnixTime() + "." + extension(PlanTomorrow.itemName)
                exec(plop.getHelper("editorCommand")() + "  " + +fileName);
                return "";
            },
        ],
    });
    // ======================================== 1on1 ==================================================================
    plop.setGenerator(OneOnOne.itemName, {
        description: OneOnOne.shortDescription,
        prompts: [
            {
                type: 'input',
                name: OneOnOne.associateField,
                message: OneOnOne.associateFieldDescription,
            }
        ],
        actions: [
            {
                type: 'add',
                path: '{{projectPath}}/' + OneOnOne.bucket + '/{{' + OneOnOne.associateField + '}}.{{shortDate}}.' + extension(OneOnOne.itemName),
                templateFile: templatePath(OneOnOne.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(OneOnOne.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: '{{projectPath}}/data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let shortDate = plop.getHelper("shortDate");
                let projectPath = plop.getHelper("projectPath");
                // @ts-ignore
                let fileName = projectPath() + "/" + OneOnOne.bucket + "/" + answers.associate + "." + shortDate() + "." + extension(OneOnOne.itemName)
                console.log(fileName);
                exec(plop.getHelper("editorCommand")() + " "+fileName);
                return "Created 1on1 item";
            },
            function persist(answers) {
                let git = new Git();
                git.load();
                git.save(OneOnOne.itemName)
                return "All Saved";
            }
        ],
    });
    // ======================================== note ==================================================================
    plop.setGenerator(Note.itemName, {
        description: Note.shortDescription,
        prompts: [
            {
                type: 'input',
                name: Note.subjectField,
                message: Note.subjectFieldDescription,
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'notes/{{hyphenFormat' + Note.subjectField + '}}.' + extension(Note.itemName),
                templateFile: templatePath(Note.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(Note.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                // @ts-ignore
                let fileName = "notes/" + format(answers.subject) + "." + Note.itemName
                exec(plop.getHelper("editorCommand")() + "  " + +fileName);
                return "";
            },
        ],
    });
    // ======================================== prepare ================================================================
    plop.setGenerator(Prepare.itemName, {
        description: Prepare.shortDescription,
        prompts: [
            {
                type: 'input',
                name: Prepare.eventField,
                message: Prepare.eventFieldDescription,
            },
        ],
        actions: [
            {
                type: 'add',
                path: Prepare.bucket + '/{{hyphenFormat event}}.' + extension(Prepare.itemName),
                templateFile: templatePath(Prepare.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(Prepare.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                // @ts-ignore
                let fileName = Prepare.bucket + "/" + format(answers.event) + "." + extension(Prepare.itemName);
                exec(plop.getHelper("editorCommand")() + "  " + +fileName);
                return "";
            },
        ],
    });
    // ======================================== log ====================================================================
    plop.setGenerator(Log.itemName, {
        description: Log.shortDescription,
        prompts: [],
        actions: [
            {
                type: 'add',
                path: Log.bucket + '/{{shortDate}}.' + extension(Log.itemName),
                templateFile: templatePath(Log.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(Log.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let shortDate = plop.getHelper("shortDate");
                let fileName = Log.bucket + "/" + shortDate() + "." + extension(Log.itemName)
                exec(plop.getHelper("editorCommand")() + "  " + +fileName);
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
    plop.setGenerator(Decision.itemName, {
        description: Decision.shortDescription,
        prompts: [
            {
                type: 'input',
                name: Decision.dilemmaField,
                message: Decision.dilemmaFieldDescription,
            },
            {
                type: 'input',
                name: Decision.decisionField,
                message: Decision.decisionFieldDescription,
            },
            {
                type: 'input',
                name: Decision.sharedFiled,
                message: Decision.sharedFieldDDescription,
            },
        ],
        actions: [
            {
                type: 'add',
                path: Decision.bucket + '/{{hyphenFormat dilemma}}.' + extension(Decision.itemName),
                templateFile: templatePath(Decision.itemName),
            },
            {
                type: 'append',
                templateFile: dataPath(Decision.itemName),
                pattern: /},(?!\n\s+{)/g,
                path: 'data.js',
            },
            function customAction(answers) {
                process.chdir(plop.getPlopfilePath());
                let format = plop.getHelper("hyphenFormat");
                // @ts-ignore
                let fileName = Decision.bucket + "/" + format(answers.dilemma) + "." + extension(Decision.itemName)
                exec(plop.getHelper("editorCommand")() + "  " + +fileName);
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
