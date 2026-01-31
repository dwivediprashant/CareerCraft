import Redis from "ioredis";

const {
    REDIS_HOST = "localhost",
    REDIS_PORT = 6379,
    REDIS_PASSWORD,
    NODE_ENV,
} = process.env;

// Create a mock Redis client for production without Redis
const createMockRedis = () => ({
    get: () => Promise.resolve(null),
    set: () => Promise.resolve("OK"),
    del: () => Promise.resolve(1),
    exists: () => Promise.resolve(0),
    expire: () => Promise.resolve(1),
    flushall: () => Promise.resolve("OK"),
    on: () => {},
    disconnect: () => {},
    call: () => Promise.resolve(null),
});

let redis;

// In production without REDIS_URL, use mock Redis
if (NODE_ENV === "production" && !process.env.REDIS_URL) {
    console.log("⚠️ Redis not configured in production - running without Redis cache");
    redis = createMockRedis();
} else {
    // Try to connect to Redis
    const redisOptions = {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
        maxRetriesPerRequest: null,
        retryStrategy: (times) => {
            if (times > 3) {
                console.warn(`[Redis] Could not connect after ${times} attempts. Using mock Redis.`);
                // Fallback to mock Redis after failed attempts
                redis = createMockRedis();
                return null;
            }
            return Math.min(times * 50, 2000);
        },
    };
    if (REDIS_PASSWORD) redisOptions.password = REDIS_PASSWORD;

    redis = new Redis(redisOptions);

    redis.on("connect", () => {
        console.log("✅ Redis connected successfully");
    });

    redis.on("error", (err) => {
        if (err.code === "ECONNREFUSED") {
            console.log("⚠️ Redis connection failed - using mock Redis");
            redis = createMockRedis();
        } else {
            console.error("Redis error:", err);
        }
    });
}

export default redis;
