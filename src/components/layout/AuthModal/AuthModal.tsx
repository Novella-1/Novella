'use client';
import { useFormik } from 'formik';

import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import * as Yup from 'yup';
import LoginForm from '@/components/common/AuthModal/LoginForm';
import RegisterForm from '@/components/common/AuthModal/RegisterForm';
import { ExitIcon, UserIcon } from '@/components/ui/custom/icons';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { login, register } from '@/services/fetchAuth';
import { AuthFormValues } from '@/types/AuthFormValues';

type AuthType = 'login' | 'register';

const AuthModal = () => {
  const [authVariant, setAuthVariant] = useState<AuthType>('login');
  const { data } = useSession();

  const authValidationSchema = Yup.object().shape({
    firstName: Yup.string().test(
      'firstName-required',
      'Enter your first name',
      function (value) {
        const { authVariant } = this.options.context as {
          authVariant: AuthType;
        };
        return authVariant === 'register' ? !!value : true;
      },
    ),
    lastName: Yup.string().test(
      'lastName-required',
      'Enter your last name',
      function (value) {
        const { authVariant } = this.options.context as {
          authVariant: AuthType;
        };
        return authVariant === 'register' ? !!value : true;
      },
    ),
    email: Yup.string().required('Enter your email').email('check your email'),
    password: Yup.string().required('Enter your password').min(6),
    confirmPassword: Yup.string().test(
      'confirmPassword-match',
      'Passwords must match',
      function (value) {
        const { authVariant } = this.options.context as {
          authVariant: AuthType;
        };
        if (authVariant === 'register') {
          return value === this.parent.password;
        }
        return true;
      },
    ),
  });

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: authValidationSchema,

    onSubmit: async (values) => {
      const { email, password, firstName, lastName } = values;

      if (authVariant === 'login') {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName);
      }
    },
  });

  if (data?.user) {
    return (
      <details className="relative">
        <summary className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-100">
          <UserIcon
            width={24}
            height={24}
            strokeWidth={1.5}
            className="text-custom-icons"
          />
        </summary>

        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg p-2 z-50">
          <button
            className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => signOut()}
          >
            <ExitIcon className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </details>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserIcon
          width={24}
          height={24}
          strokeWidth={1.5}
          className="text-custom-icons cursor-pointer"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] [&>button]:top-2 [&>button]:right-2">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <Tabs
              value={authVariant}
              onValueChange={(val: string) => setAuthVariant(val as AuthType)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* -----------Login -----------*/}
              <TabsContent value="login">
                <LoginForm formik={formik} />
              </TabsContent>

              {/* ----------- Register ----------------*/}
              <TabsContent value="register">
                <RegisterForm formik={formik} />
              </TabsContent>
            </Tabs>
          </DialogHeader>
          <DialogFooter>
            <button
              type="submit"
              className="cursor-pointer"
            >
              {authVariant === 'login' ?
                <span>Sign In</span>
              : <span>Sign Up</span>}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
