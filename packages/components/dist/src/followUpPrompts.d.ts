import { FollowUpPromptConfig, ICommonObject } from './Interface';
export declare const generateFollowUpPrompts: (followUpPromptsConfig: FollowUpPromptConfig, apiMessageContent: string, options: ICommonObject) => Promise<{
    questions: string[];
} | undefined>;
