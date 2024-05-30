import type { Argument, Command, Flag } from "./../types/command";
export default class BaseCommand implements Command {
    name: string;
    arguments: Argument[];
    flags: Flag[];
    description?: string | undefined;
    applyArgs(args: string[]): this | false;
    applyFlags(flags: Flag[]): this | false;
    handle(): void | Promise<void>;
}
