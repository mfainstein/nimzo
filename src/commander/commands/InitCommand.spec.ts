import { Configurator } from '../../configurator/Configurator';
import { InitCommand } from './InitCommand';
import { ConfigKeys } from '../../configurator/Config';

describe("InitCommand", ()=>{
    it("should run correctly", ()=>{
        let command = new InitCommand();
        process.chdir(process.env.HOME+ "/Personal")
        command.initialize({editor:"webstorm"});
        let cwd = process.cwd();
        let configurator = new Configurator();
        expect(configurator.get(ConfigKeys.PROJECT_PATH)).toBe(cwd);
        console.log(cwd);
    })
})
