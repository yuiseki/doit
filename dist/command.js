"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const _1 = require(".");
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .parserConfiguration({ 'unknown-options-as-args': true })
    .option('auto-run', {
    alias: 'y',
    description: 'Auto run',
    default: false,
})
    .boolean('auto-run')
    .help()
    .parseSync();
const main = async () => {
    const instruction = argv._.join(' ');
    const autoRun = argv['auto-run'];
    await (0, _1.doit)(instruction, autoRun);
};
(async () => {
    try {
        await main();
    }
    catch (error) {
        console.error(error);
    }
})();
