import { Configurator } from '../../configurator/Configurator';
import { InitCommand } from './InitCommand';
import Conf from 'conf';

describe("InitCommand", ()=>{
    it("should run correctly", ()=>{
        let command = new InitCommand();
        process.chdir(process.env.HOME+ "/Personal")
        command.initialize();
        let cwd = process.cwd();
        let configurator = new Configurator();
        expect(configurator.get("projectPath")).toBe(cwd);
        console.log(cwd);
    })
})
