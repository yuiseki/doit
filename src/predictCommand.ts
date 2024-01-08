import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { loadDoItChain } from './utils/chains/doit';

export const predictCommand = async (instruction: string): Promise<string | undefined> => {
  let commands = undefined;
  let embeddings: OpenAIEmbeddings;
  let llm: ChatOpenAI;
  if (process.env.CLOUDFLARE_AI_GATEWAY) {
    embeddings = new OpenAIEmbeddings({
      configuration: {
        baseURL: process.env.CLOUDFLARE_AI_GATEWAY + '/openai',
      },
    });
    llm = new ChatOpenAI({
      configuration: {
        baseURL: process.env.CLOUDFLARE_AI_GATEWAY + '/openai',
      },
      temperature: 0,
    });
  } else {
    embeddings = new OpenAIEmbeddings();
    llm = new ChatOpenAI({ temperature: 0 });
  }

  const chain = await loadDoItChain({ embeddings, llm });
  const result = await chain.call({ input: instruction });
  if (result) {
    commands = result.text;
  }
  return commands;
};

