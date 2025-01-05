"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const openai_assistants_vector_store_1 = __importDefault(require("../../controllers/openai-assistants-vector-store"));
const utils_1 = require("../../utils");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: (0, utils_1.getUploadPath)() });
// CREATE
router.post('/', openai_assistants_vector_store_1.default.createAssistantVectorStore);
// READ
router.get('/:id', openai_assistants_vector_store_1.default.getAssistantVectorStore);
// LIST
router.get('/', openai_assistants_vector_store_1.default.listAssistantVectorStore);
// UPDATE
router.put(['/', '/:id'], openai_assistants_vector_store_1.default.updateAssistantVectorStore);
// DELETE
router.delete(['/', '/:id'], openai_assistants_vector_store_1.default.deleteAssistantVectorStore);
// POST
router.post('/:id', upload.array('files'), openai_assistants_vector_store_1.default.uploadFilesToAssistantVectorStore);
// DELETE
router.patch(['/', '/:id'], openai_assistants_vector_store_1.default.deleteFilesFromAssistantVectorStore);
exports.default = router;
//# sourceMappingURL=index.js.map