import { FieldValue } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db';

// API routes to handle files fetching and editing and deleting
export default function fileHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      // Get data from your database
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
    case 'POST': {
      // Update or create data in your database
      const handlePost = async () => {
        const user = await req.body.user;
        const data = await req.body.data;
        let rs: any;

        Object.keys(data).map(async (val: any) => {
          const doc = db
            .collection(user)
            .doc('editor')
            .collection('files')
            .doc(val);
          rs = await doc.set({
            ...data[val],
            updatedAt: FieldValue.serverTimestamp()
          });
        });

        if (rs) res.send({ status: true });
        else res.send({ status: false });
      };
      handlePost();
      break;
    }
    case 'DELETE': {
      // Update or create data in your database
      const handleDelete = async () => {
        const user = req.query.user;
        const docName = req.query.doc;

        const rs = await db
          .collection(user as string)
          .doc('editor')
          .collection('files')
          .doc(docName as string)
          .delete();

        if (rs) res.send({ status: true });
        else res.send({ status: false });
      };
      handleDelete();
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
