"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDoItPrompt = exports.doItExampleList = void 0;
const memory_1 = require("langchain/vectorstores/memory");
const prompts_1 = require("@langchain/core/prompts");
const example_selectors_1 = require("@langchain/core/example_selectors");
exports.doItExampleList = [
    {
        input: 'echo hoge',
        output: 'echo hoge',
    },
    {
        input: 'show files and directories',
        output: 'ls -alh',
    },
    {
        input: 'create temporary directory',
        output: 'mkdir -p tmp',
    },
    {
        input: 'show hello world using docker',
        output: `docker run hello-world`,
    },
    {
        input: 'show hello world using docker, Ubuntu 22.04',
        output: "docker run ubuntu:22.04 /bin/echo 'Hello world'",
    },
    {
        input: 'initialize vite project with react and typescript template',
        output: `npm create vite@latest my-vite-project --template react-ts
cd my-vite-project && npm install`,
    },
    {
        input: 'add npm packages for react-map-gl',
        output: 'npm install react-map-gl maplibre-gl pmtiles',
    },
    {
        input: 'upgrade system node.js to latest version',
        output: `curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install nodejs -y`,
    },
    {
        input: 'build this project',
        output: 'npm run build',
    },
    {
        input: 'install gdal by apt',
        output: 'sudo apt-get install gdal-bin -y',
    },
];
const doItPromptPrefix = `Your name is DoIt, You are an interactive shell for the command line.
You output the best unix command based on the input text.

You will always output unix commands according to the following rules:
- You MUST ALWAYS, without fail, output valid unix commands.
- The commands MUST be enclosed by three backticks on new lines, denoting that it is a code block.

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
    for (const example of exports.doItExampleList) {
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
