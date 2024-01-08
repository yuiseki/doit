import util from 'util';
import child_process from 'child_process';
import { sleep } from './sleep';
const exec = util.promisify(child_process.exec);

export const execWithRetry = async (command: string, retryCount = 3): Promise<string> => {
  let output = '';
  for (let i = 0; i < retryCount; i++) {
    try {
      const { stdout, stderr } = await exec(command);
      if (stderr) {
        console.log(`stderr:\n${stderr}`);
        console.log(`Retry ${i + 1}/${retryCount}...`);
        await sleep(1000);
        continue;
      } else {
        output = stdout;
        break;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      console.log(`Retry ${i + 1}/${retryCount}...`);
      await sleep(1000);
    }
  }
  return output;
};

