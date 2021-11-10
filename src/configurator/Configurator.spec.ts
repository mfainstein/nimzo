import { Configurator } from './Configurator';
import { ConfigKeys } from './Config';

describe("Configurator", ()=>{
    it("should be able to set and get", ()=>{
        let configurator = new Configurator();
        configurator.set(ConfigKeys.TEST, ConfigKeys.TEST);
        expect(configurator.get(ConfigKeys.TEST)).toEqual(ConfigKeys.TEST);
    })
})
