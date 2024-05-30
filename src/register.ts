import ListCommand from "./commands/list-command";
import type { Command } from "./types/command";

export type CommandRegister = {
	[key: string]: new () => Command;
};

const commandRegister: CommandRegister = {};

const getCommandRegister = (): CommandRegister => {
	return commandRegister;
};

const registerNewCommand = (name: string, command: new () => Command) => {
	if (commandRegister[name]) {
		throw new Error(`The command "${name}" already exists.`);
	}
	commandRegister[name] = command;
};

registerNewCommand("list", ListCommand);

export { getCommandRegister, registerNewCommand };
