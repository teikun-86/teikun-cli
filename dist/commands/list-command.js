"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./../register");
const base_command_1 = __importDefault(require("./../commands/base-command"));
class ListCommand extends base_command_1.default {
    constructor() {
        super(...arguments);
        this.name = "list";
        this.description = "Show all the available commands.";
        this.arguments = [];
        this.flags = [];
    }
    handle() {
        const commandList = (0, register_1.getCommandRegister)();
        const commandKeys = Object.keys(commandList);
        console.log(`[List Command] Found ${commandKeys.length} registered commands.`);
        Object.values(commandList).forEach((CommandClass) => {
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
                    console.log(`- ${opt.name}${alias}: ${opt.description}`);
                });
            }
        });
    }
}
exports.default = ListCommand;
