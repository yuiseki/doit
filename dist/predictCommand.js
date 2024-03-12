"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictCommand = void 0;
const node_process_1 = __importDefault(require("node:process"));
const openai_1 = require("@langchain/openai");
const ollama_1 = require("@langchain/community/chat_models/ollama");
const ollama_2 = require("@langchain/community/embeddings/ollama");
const doit_1 = require("./utils/chains/doit");
const predictCommand = async (instruction) => {
    let commands = undefined;
    let embeddings;
    let llm;
    if (node_process_1.default.env.OLLAMA_BASE_URL) {
        embeddings = new ollama_2.OllamaEmbeddings({
            baseUrl: node_process_1.default.env.OLLAMA_BASE_URL,
            model: 'all-minilm:l6-v2',
        });
        llm = new ollama_1.ChatOllama({
            baseUrl: node_process_1.default.env.OLLAMA_BASE_URL,
            model: node_process_1.default.env.OLLAMA_MODEL,
            temperature: 0.0,
            stop: ['Input:'],
        });
    }
    else {
        if (node_process_1.default.env.CLOUDFLARE_AI_GATEWAY) {
            embeddings = new openai_1.OpenAIEmbeddings({
                configuration: {
                    baseURL: node_process_1.default.env.CLOUDFLARE_AI_GATEWAY + '/openai',
                },
            });
            llm = new openai_1.ChatOpenAI({
                configuration: {
                    baseURL: node_process_1.default.env.CLOUDFLARE_AI_GATEWAY + '/openai',
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
