/**
 * Used as a schema for the configurator.
 */
export const Config = {
    editor: {
        type: 'string',
        default: 'webstorm'
    },
    projectPath: {
        type: 'string'
    }
}

export enum ConfigKeys {
    PROJECT_PATH = "projectPath",
    EDITOR = "editor",
    TEST = "test"
}
