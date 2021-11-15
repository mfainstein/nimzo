/**
 * Used as a schema for the configurator.
 */
export const Config = {
    nickname: {
        type: 'string',
        default: 'nimzo-master'
    },
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
    NICKNAME = "nickname",
    TEST = "test"
}
