import { LLMChain } from 'langchain/chains';
import { BaseLanguageModel } from 'langchain/dist/base_language';
import { Embeddings } from 'langchain/embeddings/base';
export declare const loadDoItChain: ({ embeddings, llm, }: {
    embeddings: Embeddings;
    llm: BaseLanguageModel;
}) => Promise<LLMChain>;
