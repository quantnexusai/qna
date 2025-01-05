"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const attachments_1 = __importDefault(require("../../controllers/attachments"));
const utils_1 = require("../../utils");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: (0, utils_1.getUploadPath)() });
// CREATE
router.post('/:chatflowId/:chatId', upload.array('files'), attachments_1.default.createAttachment);
exports.default = router;
//# sourceMappingURL=index.js.map