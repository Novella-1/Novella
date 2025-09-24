import { signIn } from 'next-auth/react';

export const login = async (email: string, password: string) => {
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    localStorage.removeItem('favourites');
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      },
    );

    const parsedRes = await res.json();

    return parsedRes;
  } catch (e) {
    console.log(e);
  }
};
