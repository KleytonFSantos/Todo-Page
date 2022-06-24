// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteTodo } from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){ if (req.method === 'DELETE') {
    const data = JSON.parse(req.body.id);
    await deleteTodo(data.id);
    return res.status(200).json({ message: 'Success' })
  }
}