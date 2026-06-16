import { kv } from '@vercel/kv';

const KEY = 'nomain_tracker_main';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const state = await kv.get(KEY);
    return res.json(state || { progress: { 'ph-found': 55 }, done: {} });
  }

  if (req.method === 'POST') {
    const { progress, done } = req.body;
    await kv.set(KEY, { progress: progress || {}, done: done || {} });
    return res.json({ ok: true });
  }

  res.status(405).end();
}
