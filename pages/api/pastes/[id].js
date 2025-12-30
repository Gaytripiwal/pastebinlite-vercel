import { getPaste, incrementViewCount } from '../../../lib/redis';
import { getCurrentTime } from '../../../lib/utils';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const testMode = process.env.TEST_MODE === '1';
  const currentTime = getCurrentTime(testMode, req.headers);

  try {
    // Get paste from Redis
    let paste = await getPaste(id);
    
    if (!paste) {
      return res.status(404).json({ error: 'Paste not found or unavailable' });
    }

    // Check if expired (using test time if in test mode)
    if (paste.expires_at && new Date(paste.expires_at) < currentTime) {
      return res.status(404).json({ error: 'Paste expired' });
    }

    // Check if view limit reached
    if (paste.max_views !== null && paste.remaining_views <= 0) {
      return res.status(404).json({ error: 'Paste view limit exceeded' });
    }

    // Increment view count (decrement remaining views)
    paste = await incrementViewCount(id, paste);

    // Prepare response
    const response = {
      content: paste.content,
      remaining_views: paste.remaining_views,
      expires_at: paste.expires_at,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching paste:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}