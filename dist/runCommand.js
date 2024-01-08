"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const exec = util_1.default.promisify(child_process_1.default.exec);
const readline_1 = __importDefault(require("readline"));
const runCommand = async (command, autoRun) => {
    console.log('');
    if (!autoRun) {
        // Waiting confirm from user to run command
        // use readline
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const answer = await new Promise((resolve, reject) => {
            rl.question(`????? Predicted command:
\`\`\`
${command}
\`\`\`

Confirm to run above command (y/n): `, (answer) => {
                resolve(answer);
            });
        });
        rl.close();
        if (answer !== 'y') {
            throw new Error('Command is not confirmed');
        }
    }
    else {
        console.log(`!!!!! Executing predicted command:
\`\`\`
${command}
\`\`\``);
    }
    console.log('');
    const { stdout, stderr } = await exec(`${command}`, { timeout: 1000 * 60 * 5 });
    if (stderr) {
        throw new Error(`stderr: ${stderr}`);
    }
    return `${stdout}`;
};
exports.runCommand = runCommand;
