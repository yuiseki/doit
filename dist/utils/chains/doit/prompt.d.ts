import { FewShotPromptTemplate } from '@langchain/core/prompts';
import { Embeddings } from 'langchain/embeddings/base';
export declare const doItExampleList: Array<{
    input: string;
    output: string;
}>;
export declare const loadDoItPrompt: (embeddings: Embeddings) => Promise<FewShotPromptTemplate>;
