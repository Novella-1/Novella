'use client';
import { useFormik } from 'formik';

import { useSession, signOut } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

import LoginForm from '@/components/common/AuthModal/LoginForm';
import RegisterForm from '@/components/common/AuthModal/RegisterForm';
import { authValidationSchema } from '@/components/common/AuthModal/validationShema';
import { Button } from '@/components/ui/button';
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
import { AuthFormValues } from '@/types/AuthFormValuesType';

type AuthType = 'login' | 'register';

const AuthModal = () => {
  const [authVariant, setAuthVariant] = useState<AuthType>('login');
  const { data } = useSession();

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: authValidationSchema(authVariant),

    onSubmit: async (values) => {
      const { email, password, firstName, lastName } = values;

      if (authVariant === 'login') {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName);
      }
    },
  });

  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        detailsRef.current.removeAttribute('open');
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (data?.user) {
    return (
      <details
        ref={detailsRef}
        className="relative"
      >
        <summary className="flex items-center cursor-pointer rounded">
          <UserIcon className="w-6 h-6 md:w-4 md:h-4 xl:w-6 xl:h-6 text-custom-icons" />
        </summary>

        <div className="absolute top-9 right-0 mt-2 w-40 border bg-custom-header-footer rounded shadow-lg p-2 z-50">
          <button
            className="flex items-center gap-2 w-full px-2 py-1 cursor-pointer rounded text-custom-icons"
            onClick={async () => {
              await signOut({
                // redirect: false
                redirectTo: '/',
              });
              // router.push('/');
            }}
          >
            <ExitIcon className="w-5 h-5 xl:w-6 xl:h-6 border-custom-button" />
            Sign out
          </button>
        </div>
      </details>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserIcon className="w-4 h-4 xl:w-6 xl:h-6 text-custom-icons cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="w-[280px] max:h-[380px] overflow-auto md:w-[340px] xl:w-[400px] h-[420px] bg-custom-header-footer scrollbar-hide [&>button]:top-2 [&>button]:right-2 [&>button]:cursor-pointer">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <Tabs
              value={authVariant}
              onValueChange={(val: string) => setAuthVariant(val as AuthType)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-custom-border">
                <TabsTrigger
                  value="login"
                  className="cursor-pointer font-manrope text-custom-button"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="cursor-pointer font-manrope text-custom-button"
                >
                  Register
                </TabsTrigger>
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
            <Button
              type="submit"
              className="cursor-pointer px-3 bg-custom-button text-custom-button-text"
            >
              {authVariant === 'login' ?
                <span>Sign In</span>
              : <span>Sign Up</span>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
