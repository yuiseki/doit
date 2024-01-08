import { LLMChain } from 'langchain/chains';
import { BaseLanguageModel } from 'langchain/dist/base_language';
import { Embeddings } from 'langchain/embeddings/base';
import { loadDoItPrompt } from './prompt';

export const loadDoItChain = async ({
  embeddings,
  llm,
}: {
  embeddings: Embeddings;
  llm: BaseLanguageModel;
}): Promise<LLMChain> => {
  const prompt = await loadDoItPrompt(embeddings);
  const chain = new LLMChain({
    llm: llm,
    prompt: prompt,
  });
  return chain;
};

