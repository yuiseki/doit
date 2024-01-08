"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDoItChain = void 0;
const chains_1 = require("langchain/chains");
const prompt_1 = require("./prompt");
const loadDoItChain = async ({ embeddings, llm, }) => {
    const prompt = await (0, prompt_1.loadDoItPrompt)(embeddings);
    const chain = new chains_1.LLMChain({
        llm: llm,
        prompt: prompt,
    });
    return chain;
};
exports.loadDoItChain = loadDoItChain;
