export type Argument = {
	name: string;
	description: string;
	value?: any;
};

export type Flag = {
	name: string;
	description?: string;
	alias?: string[];
	value?: any;
};

export interface Command {
	name: string;
	arguments?: Argument[];
	description?: string;
	flags?: Flag[];
	handle(): void | Promise<void>;
	applyArgs(args?: string[]): this | false;
	applyFlags(flags?: Flag[]): this | false;
}
