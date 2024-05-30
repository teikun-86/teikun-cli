#!/usr/bin/env node

import { version } from "./version";
import { getCommandRegister } from "./register";
import type { Flag } from "./types/command";

console.log(`> Teikun-cli v${version}.`)

const commandRegister = getCommandRegister();

const handleCommand = async (
	command: string,
	args?: string[],
	flags?: Flag[]
) => {
	const commandClass = commandRegister[command];
	if (!commandClass) {
		if (command) {
			console.error(
				`The "${command}" command does not exist. Make sure to register your command using the "registerNewCommand" function.`
			);
		}
		handleCommand("list", [], []);
		return;
	}

	const commandToRun = new commandClass();
	const applyArgs = commandToRun.applyArgs(args);
	const applyFlags = commandToRun.applyFlags(flags);
	if (!applyArgs || !applyFlags) {
		return;
	}
	await commandToRun.handle();
};

const handle = async () => {
	const args = process.argv.slice(2);

	const command = args[0];
	const commandArgs = args.slice(1).filter((arg) => !arg.startsWith("--"));

	let options: Flag[] = [];

	args.forEach((arg) => {
		if (arg.startsWith("--")) {
			const optionPair = arg.split("=");
			const key = optionPair[0];
			const value = optionPair.length === 1 ? true : optionPair[1];

			const option: Flag = {
				name: key,
				value,
			};
			options.push(option);
		}
	});

	await handleCommand(command, commandArgs, options);
};

handle();
