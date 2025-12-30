import { generateId, validatePasteData, sanitizeContent, getCurrentTime, calculateExpiresAt } from '../../../lib/utils';
import { setPaste } from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    // Validate input
    const errors = validatePasteData(body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    const testMode = process.env.TEST_MODE === '1';
    const currentTime = getCurrentTime(testMode, req.headers);
    
    // Generate paste data
    const id = generateId();
    const expiresAt = calculateExpiresAt(body.ttl_seconds, currentTime);
    
    const pasteData = {
      id,
      content: sanitizeContent(body.content),
      created_at: currentTime.toISOString(),
      expires_at: expiresAt,
      max_views: body.max_views || null,
      remaining_views: body.max_views || null,
      ttl_seconds: body.ttl_seconds || null,
    };

    // Store in Redis
    await setPaste(id, pasteData);

    // Construct response
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pastebin-lite.vercel.app';
    const url = `${baseUrl}/p/${id}`;

    res.status(201).json({
      id,
      url,
    });
  } catch (error) {
    console.error('Error creating paste:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}