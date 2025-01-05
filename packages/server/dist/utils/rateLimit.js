"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateLimiter = getRateLimiter;
exports.updateRateLimiter = updateRateLimiter;
exports.initializeRateLimiter = initializeRateLimiter;
const express_rate_limit_1 = require("express-rate-limit");
const async_mutex_1 = require("async-mutex");
let rateLimiters = {};
const rateLimiterMutex = new async_mutex_1.Mutex();
async function addRateLimiter(id, duration, limit, message) {
    const release = await rateLimiterMutex.acquire();
    try {
        rateLimiters[id] = (0, express_rate_limit_1.rateLimit)({
            windowMs: duration * 1000,
            max: limit,
            handler: (_, res) => {
                res.status(429).send(message);
            }
        });
    }
    finally {
        release();
    }
}
function removeRateLimit(id) {
    if (rateLimiters[id]) {
        delete rateLimiters[id];
    }
}
function getRateLimiter(req, res, next) {
    const id = req.params.id;
    if (!rateLimiters[id])
        return next();
    const idRateLimiter = rateLimiters[id];
    return idRateLimiter(req, res, next);
}
async function updateRateLimiter(chatFlow) {
    if (!chatFlow.apiConfig)
        return;
    const apiConfig = JSON.parse(chatFlow.apiConfig);
    const rateLimit = apiConfig.rateLimit;
    if (!rateLimit)
        return;
    const { limitDuration, limitMax, limitMsg, status } = rateLimit;
    if (status === false)
        removeRateLimit(chatFlow.id);
    else if (limitMax && limitDuration && limitMsg)
        await addRateLimiter(chatFlow.id, limitDuration, limitMax, limitMsg);
}
async function initializeRateLimiter(chatFlowPool) {
    await Promise.all(chatFlowPool.map(async (chatFlow) => {
        await updateRateLimiter(chatFlow);
    }));
}
//# sourceMappingURL=rateLimit.js.map