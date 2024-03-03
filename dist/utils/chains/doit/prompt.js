"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDoItPrompt = void 0;
const memory_1 = require("langchain/vectorstores/memory");
const prompts_1 = require("@langchain/core/prompts");
const example_selectors_1 = require("@langchain/core/example_selectors");
const examples_1 = require("./examples");
const doItPromptPrefix = `Your name is DoIt, You are an interactive shell for the command line.
You output the best unix command based on the input text.

You will always output unix commands according to the following rules:
- You MUST ALWAYS, without fail, output valid unix commands.
- The commands MUST be enclosed by three backticks on new lines, denoting that it is a code block.
- Examples are just as examples; be creative in your response, taking into account the intent of the Input as much as possible.

### Examples: ###`;
const loadDoItPrompt = async (embeddings) => {
    const memoryVectorStore = new memory_1.MemoryVectorStore(embeddings);
    const exampleSelector = new example_selectors_1.SemanticSimilarityExampleSelector({
        vectorStore: memoryVectorStore,
        k: 4,
        inputKeys: ['input'],
    });
    const examplePrompt = prompts_1.PromptTemplate.fromTemplate(`Input:
{input}

Output:
\`\`\`
{output}
\`\`\`
`);
    for (const example of examples_1.doItExampleList) {
        await exampleSelector.addExample(example);
    }
    const dynamicPrompt = new prompts_1.FewShotPromptTemplate({
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
exports.loadDoItPrompt = loadDoItPrompt;
