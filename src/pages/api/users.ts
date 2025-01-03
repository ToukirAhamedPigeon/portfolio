import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const newUser: IUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
          } else {
            res.status(400).json({ error: 'An unknown error occurred' });
          }
    }
  } else if (req.method === 'GET') {
    try {
      const users: IUser[] = await User.find();
      res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          } else {
            res.status(500).json({ error: 'An unknown error occurred' });
          }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
