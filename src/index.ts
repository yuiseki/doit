import { predictCommand } from './predictCommand';
import { runCommand } from './runCommand';

export const doit = async (instruction: string, autoRun?: boolean): Promise<void> => {
  const commandsString = await predictCommand(instruction);
  if (!commandsString) {
    throw new Error('Command does not predicted');
  }

  console.debug('-------------------');
  console.debug('All Predicted commands:');
  console.debug(commandsString);
  console.debug('-------------------');

  const commands = commandsString.split('```')[1].split('\n');
  for (const command of commands) {
    if (!command) {
      continue;
    }
    if (command.length === 0) {
      continue;
    }
    const result = await runCommand(command, autoRun);
    console.log(result);
  }
};

