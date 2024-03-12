import process from 'node:process';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { loadDoItChain } from './utils/chains/doit';

export const predictCommand = async (instruction: string): Promise<string | undefined> => {
  let commands = undefined;
  let embeddings;
  let llm;
  if (process.env.OLLAMA_BASE_URL) {
    embeddings = new OllamaEmbeddings({
      baseUrl: process.env.OLLAMA_BASE_URL,
      model: 'all-minilm:l6-v2',
    });
    llm = new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL,
      model: process.env.OLLAMA_MODEL,
      temperature: 0.0,
      stop: ['Input:'],
    });
  } else {
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
  }

  const chain = await loadDoItChain({ embeddings, llm });
  const result = await chain.call({ input: instruction });
  if (result) {
    commands = result.text;
  }
  return commands;
};

