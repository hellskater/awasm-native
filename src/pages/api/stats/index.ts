import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db';

// API routes to handle stats data
export default function fileHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const handleGet = async () => {
        const doc = await db
          .collection('dummy-stats')
          .doc('recentActivity')
          .get();

        res.send(doc.data());
      };
      handleGet();
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
