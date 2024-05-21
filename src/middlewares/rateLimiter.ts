import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    keyGenerator: (req) => req.headers['api-key'] as string,
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});

export default apiLimiter;
