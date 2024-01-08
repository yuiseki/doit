import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { PromptTemplate, FewShotPromptTemplate } from '@langchain/core/prompts';
import { SemanticSimilarityExampleSelector } from '@langchain/core/example_selectors';
import { Embeddings } from 'langchain/embeddings/base';
import { doItExampleList } from './examples';

const doItPromptPrefix = `Your name is DoIt, You are an interactive shell for the command line.
You output the best unix command based on the input text.

You will always output unix commands according to the following rules:
- You MUST ALWAYS, without fail, output valid unix commands.
- The commands MUST be enclosed by three backticks on new lines, denoting that it is a code block.

### Examples: ###`;

export const loadDoItPrompt = async (embeddings: Embeddings) => {
  const memoryVectorStore = new MemoryVectorStore(embeddings);
  const exampleSelector = new SemanticSimilarityExampleSelector({
    vectorStore: memoryVectorStore,
    k: 4,
    inputKeys: ['input'],
  });
  const examplePrompt = PromptTemplate.fromTemplate(
    `Input:
{input}

Output:
\`\`\`
{output}
\`\`\`
`
  );

  for (const example of doItExampleList) {
    await exampleSelector.addExample(example);
  }

  const dynamicPrompt = new FewShotPromptTemplate({
    exampleSelector: exampleSelector,
    examplePrompt: examplePrompt,
    prefix: doItPromptPrefix,
    suffix: `
### Current conversation: ###

Input:
{input}

Output:
`,
    inputVariables: ['input'],
  });
  return dynamicPrompt;
};

