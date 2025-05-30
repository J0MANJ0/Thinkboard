import ratelimit from '../src/config/upstash.js';

const rateLimiter = async (_, res, next) => {
  try {
    const { success } = await ratelimit.limit('my-limit-key');

    if (!success) {
      return res.status(429).json({
        msg: 'Too many requests,try again later',
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default rateLimiter;
