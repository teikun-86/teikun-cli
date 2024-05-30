"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewCommand = exports.getCommandRegister = void 0;
const list_command_1 = __importDefault(require("./commands/list-command"));
const commandRegister = {};
const getCommandRegister = () => {
    return commandRegister;
};
exports.getCommandRegister = getCommandRegister;
const registerNewCommand = (name, command) => {
    if (commandRegister[name]) {
        throw new Error(`The command "${name}" already exists.`);
    }
    commandRegister[name] = command;
};
exports.registerNewCommand = registerNewCommand;
registerNewCommand("list", list_command_1.default);
