import { Redis } from '@upstash/redis'
import 'dotenv/config';
import { Ratelimit } from "@upstash/ratelimit";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60s'), // 100 requests per 60 seconds
})

export default rateLimit;