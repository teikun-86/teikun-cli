import type { Command } from "./types/command";
export type CommandRegister = {
    [key: string]: new () => Command;
};
declare const getCommandRegister: () => CommandRegister;
declare const registerNewCommand: (name: string, command: new () => Command) => void;
export { getCommandRegister, registerNewCommand };
