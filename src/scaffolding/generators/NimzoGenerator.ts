import { PlopGeneratorConfig } from 'node-plop';

export abstract class NimzoGenerator {
    // TODO: doBuildActions etc.
    abstract resolveDescription(): string;

    abstract buildPrompts(): any;

    abstract buildActions(): any;

    public build(): PlopGeneratorConfig {
        return {
            description: this.resolveDescription(),
            prompts: this.buildPrompts(),
            actions: this.buildActions()
        }
    }
}
