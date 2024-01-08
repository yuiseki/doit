import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);
import readline from 'readline';

export const runCommand = async (command: string, autoRun?: boolean): Promise<string> => {
  console.log('');
  if (!autoRun) {
    // Waiting confirm from user to run command
    // use readline
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await new Promise<string>((resolve, reject) => {
      rl.question(
        `????? Predicted command:
\`\`\`
${command}
\`\`\`

Confirm to run above command (y/n): `,
        (answer) => {
          resolve(answer);
        }
      );
    });
    rl.close();
    if (answer !== 'y') {
      throw new Error('Command is not confirmed');
    }
  } else {
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

