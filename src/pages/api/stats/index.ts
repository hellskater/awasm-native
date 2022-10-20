import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db';

export default function fileHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const handleGet = async () => {
        const user = req.query.user;
        const data: any = {};
        const snapshot = await db
          .collection(user as string)
          .doc('editor')
          .collection('files')
          .get();
        snapshot.forEach(doc => {
          data[doc.id] = doc.data();
        });
        if (Object.keys(data).length > 0) {
          res.send(data);
        } else res.send(null);
      };
      handleGet();
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
