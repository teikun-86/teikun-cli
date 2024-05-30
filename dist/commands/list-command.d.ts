import type { Argument, Flag } from "./../types/command";
import BaseCommand from "./../commands/base-command";
export default class ListCommand extends BaseCommand {
    name: string;
    description: string;
    arguments: Argument[];
    flags: Flag[];
    handle(): void;
}
