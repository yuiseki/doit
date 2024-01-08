import { FewShotPromptTemplate } from '@langchain/core/prompts';
import { Embeddings } from 'langchain/embeddings/base';
export declare const loadDoItPrompt: (embeddings: Embeddings) => Promise<FewShotPromptTemplate>;
