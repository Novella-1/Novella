// pages/api/auth/register.ts
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';
import { prisma } from '@/server/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        Profile: { create: { firstName, lastName } },
      },
    });

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) return res.status(401).json({ error: result.error });

    return res
      .status(200)
      .json({ message: 'User registered and logged in', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
