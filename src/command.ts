import yargs from 'yargs/yargs';
import { doit } from '.';

const argv = yargs(process.argv.slice(2))
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
  const instruction = argv._.join(' ') as string;
  const autoRun = argv['auto-run'];

  await doit(instruction, autoRun);
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
})();

