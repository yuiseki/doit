"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doit = void 0;
const predictCommand_1 = require("./predictCommand");
const runCommand_1 = require("./runCommand");
const doit = async (instruction, autoRun) => {
    const commandsString = await (0, predictCommand_1.predictCommand)(instruction);
    if (!commandsString) {
        throw new Error('Command is not predicted');
    }
    const commands = commandsString.split('```')[1].split('\n');
    for (const command of commands) {
        if (!command) {
            continue;
        }
        if (command.length === 0) {
            continue;
        }
        const result = await (0, runCommand_1.runCommand)(command, autoRun);
        console.log(result);
    }
};
exports.doit = doit;
