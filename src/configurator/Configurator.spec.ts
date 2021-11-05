import { Configurator } from './Configurator';

describe("Configurator", ()=>{
    it("should be able to set and get", ()=>{
        let configurator = new Configurator();
        configurator.set("test", "test");
        expect(configurator.get("test")).toBe("test");
    })
})
