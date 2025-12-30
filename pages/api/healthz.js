import { checkHealth } from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const isHealthy = await checkHealth();
    
    if (isHealthy) {
      res.status(200).json({ ok: true });
    } else {
      res.status(503).json({ ok: false, error: 'Cannot connect to persistence layer' });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}