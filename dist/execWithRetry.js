"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execWithRetry = void 0;
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const sleep_1 = require("./sleep");
const exec = util_1.default.promisify(child_process_1.default.exec);
const execWithRetry = async (command, retryCount = 3) => {
    let output = '';
    for (let i = 0; i < retryCount; i++) {
        try {
            const { stdout, stderr } = await exec(command);
            if (stderr) {
                console.log(`stderr:\n${stderr}`);
                console.log(`Retry ${i + 1}/${retryCount}...`);
                await (0, sleep_1.sleep)(1000);
                continue;
            }
            else {
                output = stdout;
                break;
            }
        }
        catch (error) {
            console.log(`Error: ${error}`);
            console.log(`Retry ${i + 1}/${retryCount}...`);
            await (0, sleep_1.sleep)(1000);
        }
    }
    return output;
};
exports.execWithRetry = execWithRetry;
