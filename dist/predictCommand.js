"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictCommand = void 0;
const openai_1 = require("@langchain/openai");
const ollama_1 = require("@langchain/community/chat_models/ollama");
const ollama_2 = require("@langchain/community/embeddings/ollama");
const doit_1 = require("./utils/chains/doit");
const predictCommand = async (instruction) => {
    let commands = undefined;
    let embeddings;
    let llm;
    if (process.env.OLLAMA_BASE_URL) {
        embeddings = new ollama_2.OllamaEmbeddings({
            baseUrl: process.env.OLLAMA_BASE_URL,
            model: 'all-minilm:l6-v2',
        });
        llm = new ollama_1.ChatOllama({
            baseUrl: process.env.OLLAMA_BASE_URL,
            model: 'deepseek-coder:1.3b-instruct',
        });
    }
    else {
        if (process.env.CLOUDFLARE_AI_GATEWAY) {
            embeddings = new openai_1.OpenAIEmbeddings({
                configuration: {
                    baseURL: process.env.CLOUDFLARE_AI_GATEWAY + '/openai',
                },
            });
            llm = new openai_1.ChatOpenAI({
                configuration: {
                    baseURL: process.env.CLOUDFLARE_AI_GATEWAY + '/openai',
                },
                temperature: 0,
            });
        }
        else {
            embeddings = new openai_1.OpenAIEmbeddings();
            llm = new openai_1.ChatOpenAI({ temperature: 0 });
        }
    }
    const chain = await (0, doit_1.loadDoItChain)({ embeddings, llm });
    const result = await chain.call({ input: instruction });
    if (result) {
        commands = result.text;
    }
    return commands;
};
exports.predictCommand = predictCommand;
