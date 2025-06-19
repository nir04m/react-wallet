import rateLimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    //in a real-world application, you would use the user's IP address or a unique identifier
    const {success} = await rateLimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({ error: 'Rate limit has been exceeded, please try again later' });
    }
    next();
  } catch (error) {
    console.error('Rate limit error:', error);
   next(error); // Pass the error to the next middleware
  }
};

export default rateLimiter;
