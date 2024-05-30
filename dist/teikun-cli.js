#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("./version");
const register_1 = require("./register");
console.log(`> Teikun-cli v${version_1.version}.`);
const commandRegister = (0, register_1.getCommandRegister)();
const handleCommand = (command, args, flags) => __awaiter(void 0, void 0, void 0, function* () {
    const commandClass = commandRegister[command];
    if (!commandClass) {
        if (command) {
            console.error(`The "${command}" command does not exist. Make sure to register your command using the "registerNewCommand" function.`);
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
    yield commandToRun.handle();
});
const handle = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = process.argv.slice(2);
    const command = args[0];
    const commandArgs = args.slice(1).filter((arg) => !arg.startsWith("--"));
    let options = [];
    args.forEach((arg) => {
        if (arg.startsWith("--")) {
            const optionPair = arg.split("=");
            const key = optionPair[0];
            const value = optionPair.length === 1 ? true : optionPair[1];
            const option = {
                name: key,
                value,
            };
            options.push(option);
        }
    });
    yield handleCommand(command, commandArgs, options);
});
handle();
