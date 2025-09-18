// app/test/page.tsx
import bcrypt from 'bcrypt';
import { prisma } from '@/server/prisma';

export default async function TestPage() {
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      hashedPassword,
    },
  });

  console.log('User created:', user);

  return <div>User created: {user.email}</div>;
}
