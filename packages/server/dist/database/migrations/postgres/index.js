"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresMigrations = void 0;
const _1693891895163_Init_1 = require("./1693891895163-Init");
const _1693995626941_ModifyChatFlow_1 = require("./1693995626941-ModifyChatFlow");
const _1693996694528_ModifyChatMessage_1 = require("./1693996694528-ModifyChatMessage");
const _1693997070000_ModifyCredential_1 = require("./1693997070000-ModifyCredential");
const _1693997339912_ModifyTool_1 = require("./1693997339912-ModifyTool");
const _1694099183389_AddApiConfig_1 = require("./1694099183389-AddApiConfig");
const _1694432361423_AddAnalytic_1 = require("./1694432361423-AddAnalytic");
const _1694658756136_AddChatHistory_1 = require("./1694658756136-AddChatHistory");
const _1699325775451_AddAssistantEntity_1 = require("./1699325775451-AddAssistantEntity");
const _1699481607341_AddUsedToolsToChatMessage_1 = require("./1699481607341-AddUsedToolsToChatMessage");
const _1699900910291_AddCategoryToChatFlow_1 = require("./1699900910291-AddCategoryToChatFlow");
const _1700271021237_AddFileAnnotationsToChatMessage_1 = require("./1700271021237-AddFileAnnotationsToChatMessage");
const _1701788586491_AddFileUploadsToChatMessage_1 = require("./1701788586491-AddFileUploadsToChatMessage");
const _1702200925471_AddVariableEntity_1 = require("./1702200925471-AddVariableEntity");
const _1706364937060_AddSpeechToText_1 = require("./1706364937060-AddSpeechToText");
const _1707213601923_AddFeedback_1 = require("./1707213601923-AddFeedback");
const _1709814301358_AddUpsertHistoryEntity_1 = require("./1709814301358-AddUpsertHistoryEntity");
const _1710497452584_FieldTypes_1 = require("./1710497452584-FieldTypes");
const _1710832137905_AddLead_1 = require("./1710832137905-AddLead");
const _1711538016098_AddLeadToChatMessage_1 = require("./1711538016098-AddLeadToChatMessage");
const _1715861032479_AddVectorStoreConfigToDocStore_1 = require("./1715861032479-AddVectorStoreConfigToDocStore");
const _1711637331047_AddDocumentStore_1 = require("./1711637331047-AddDocumentStore");
const _1714679514451_AddAgentReasoningToChatMessage_1 = require("./1714679514451-AddAgentReasoningToChatMessage");
const _1716300000000_AddTypeToChatFlow_1 = require("./1716300000000-AddTypeToChatFlow");
const _1720230151480_AddApiKey_1 = require("./1720230151480-AddApiKey");
const _1721078251523_AddActionToChatMessage_1 = require("./1721078251523-AddActionToChatMessage");
const _1725629836652_AddCustomTemplate_1 = require("./1725629836652-AddCustomTemplate");
const _1726156258465_AddArtifactsToChatMessage_1 = require("./1726156258465-AddArtifactsToChatMessage");
const _1726666309552_AddFollowUpPrompts_1 = require("./1726666309552-AddFollowUpPrompts");
const _1733011290987_AddTypeToAssistant_1 = require("./1733011290987-AddTypeToAssistant");
exports.postgresMigrations = [
    _1693891895163_Init_1.Init1693891895163,
    _1693995626941_ModifyChatFlow_1.ModifyChatFlow1693995626941,
    _1693996694528_ModifyChatMessage_1.ModifyChatMessage1693996694528,
    _1693997070000_ModifyCredential_1.ModifyCredential1693997070000,
    _1693997339912_ModifyTool_1.ModifyTool1693997339912,
    _1694099183389_AddApiConfig_1.AddApiConfig1694099183389,
    _1694432361423_AddAnalytic_1.AddAnalytic1694432361423,
    _1694658756136_AddChatHistory_1.AddChatHistory1694658756136,
    _1699325775451_AddAssistantEntity_1.AddAssistantEntity1699325775451,
    _1699481607341_AddUsedToolsToChatMessage_1.AddUsedToolsToChatMessage1699481607341,
    _1699900910291_AddCategoryToChatFlow_1.AddCategoryToChatFlow1699900910291,
    _1700271021237_AddFileAnnotationsToChatMessage_1.AddFileAnnotationsToChatMessage1700271021237,
    _1702200925471_AddVariableEntity_1.AddVariableEntity1699325775451,
    _1701788586491_AddFileUploadsToChatMessage_1.AddFileUploadsToChatMessage1701788586491,
    _1706364937060_AddSpeechToText_1.AddSpeechToText1706364937060,
    _1709814301358_AddUpsertHistoryEntity_1.AddUpsertHistoryEntity1709814301358,
    _1707213601923_AddFeedback_1.AddFeedback1707213601923,
    _1710497452584_FieldTypes_1.FieldTypes1710497452584,
    _1711637331047_AddDocumentStore_1.AddDocumentStore1711637331047,
    _1710832137905_AddLead_1.AddLead1710832137905,
    _1711538016098_AddLeadToChatMessage_1.AddLeadToChatMessage1711538016098,
    _1714679514451_AddAgentReasoningToChatMessage_1.AddAgentReasoningToChatMessage1714679514451,
    _1716300000000_AddTypeToChatFlow_1.AddTypeToChatFlow1716300000000,
    _1715861032479_AddVectorStoreConfigToDocStore_1.AddVectorStoreConfigToDocStore1715861032479,
    _1720230151480_AddApiKey_1.AddApiKey1720230151480,
    _1721078251523_AddActionToChatMessage_1.AddActionToChatMessage1721078251523,
    _1725629836652_AddCustomTemplate_1.AddCustomTemplate1725629836652,
    _1726156258465_AddArtifactsToChatMessage_1.AddArtifactsToChatMessage1726156258465,
    _1726666309552_AddFollowUpPrompts_1.AddFollowUpPrompts1726666309552,
    _1733011290987_AddTypeToAssistant_1.AddTypeToAssistant1733011290987
];
//# sourceMappingURL=index.js.map