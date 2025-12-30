const Redis = require('ioredis');

let redisClient;

function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL || process.env.KV_URL;
  
  if (!redisUrl) {
    throw new Error('Redis URL is not configured');
  }

  redisClient = new Redis(redisUrl);
  return redisClient;
}

async function setPaste(id, data) {
  const client = getRedisClient();
  const key = `paste:${id}`;
  
  // Set expiration if TTL is provided
  if (data.ttl_seconds) {
    await client.setex(key, data.ttl_seconds, JSON.stringify(data));
  } else {
    await client.set(key, JSON.stringify(data));
  }
}

async function getPaste(id) {
  const client = getRedisClient();
  const key = `paste:${id}`;
  const data = await client.get(key);
  
  if (!data) {
    return null;
  }
  
  const paste = JSON.parse(data);
  
  // Check if paste should be deleted (expired or view limit reached)
  const shouldDelete = (
    (paste.expires_at && new Date(paste.expires_at) < new Date()) ||
    (paste.max_views !== null && paste.remaining_views <= 0)
  );
  
  if (shouldDelete) {
    await client.del(key);
    return null;
  }
  
  return paste;
}

async function incrementViewCount(id, paste) {
  const client = getRedisClient();
  const key = `paste:${id}`;
  
  if (paste.max_views !== null) {
    paste.remaining_views -= 1;
    
    // If no views left, delete immediately
    if (paste.remaining_views <= 0) {
      await client.del(key);
    } else {
      // Update with new view count
      await client.set(key, JSON.stringify(paste));
    }
  }
  
  return paste;
}

async function checkHealth() {
  try {
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getRedisClient,
  setPaste,
  getPaste,
  incrementViewCount,
  checkHealth,
};