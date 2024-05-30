import type { Argument, Command, Flag } from "./../types/command";

export default class BaseCommand implements Command {
	name!: string;
	arguments: Argument[] = [];
	flags: Flag[] = [];
	description?: string | undefined;

	applyArgs(args: string[]): this | false {
		try {
			if (this.arguments.length === 0 && args.length > 0) {
				throw new Error(
					`The "${this.name}" command does not accept any arguments.`
				);
			}
			if (this.arguments.length > args.length) {
				throw new Error(
					`The "${this.name}" command expects ${this.arguments.length} arguments, ${args.length} given.`
				);
			}
			args.map((arg: string, i: number) => {
				this.arguments[i].value = arg;
			});
			return this;
		} catch (error: any) {
			console.error(error.message);
			return false;
		}
	}

	applyFlags(flags: Flag[]): this | false {
		try {
			if (this.flags.length === 0 && flags.length > 0) {
				throw new Error(
					`The "${this.name}" command does not accept any options.`
				);
			}
			flags.forEach((flag) => {
				const idx = this.flags.findIndex((a) => a.name === flag.name);

				if (idx > -1) {
					this.flags[idx].value = flag.value;
				} else {
					throw new Error(
						`The "${flag.name}" option is not defined in "${this.name}" command.`
					);
				}
			});
			return this;
		} catch (error: any) {
			console.error(error.message);
			return false;
		}
	}

	handle(): void | Promise<void> {
		throw new Error("Method not implemented.");
	}
}
