import { getCommandRegister } from "./../register";
import type { Argument, Command, Flag } from "./../types/command";
import BaseCommand from "./../commands/base-command";

export default class ListCommand extends BaseCommand {
	name: string = "list";
	description: string = "Show all the available commands.";
	arguments: Argument[] = [];
	flags: Flag[] = [];

	handle(): void {
		const commandList = getCommandRegister();
		const commandKeys = Object.keys(commandList);
		console.log(
			`[List Command] Found ${commandKeys.length} registered commands.`
		);
		Object.values(commandList).forEach(
			(CommandClass: new () => Command) => {
				const commandInstance = new CommandClass();
				console.log(`\nName: ${commandInstance.name}`);
				console.log(`Description: ${commandInstance.description}`);
				if (commandInstance.arguments) {
					console.log("Arguments:");
					commandInstance.arguments.forEach((arg) => {
						console.log(`- ${arg.name}: ${arg.description}`);
					});
				}
				if (commandInstance.flags) {
					console.log("Options:");
					commandInstance.flags.forEach((opt) => {
						const alias = opt.alias ? ` (-${opt.alias})` : "";
						console.log(
							`- ${opt.name}${alias}: ${opt.description}`
						);
					});
				}
			}
		);
	}
}
