import rateLimit from 'express-rate-limit'

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // 100 requests per IP
  standardHeaders: true,   // Return RateLimit headers
  legacyHeaders: false,    // Disable X-RateLimit-* headers
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
})
