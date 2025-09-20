'use client';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { UserIcon } from '@/components/ui/custom/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AuthType = 'login' | 'register';

const AuthModal = () => {
  const [authVariant, setAuthVariant] = useState<AuthType>('login');

  const login = async (email: string, password: string) => {
    try {
      await signIn('Credentials', {
        email,
        password,
        // TODO: REDIRECT ???
        // redirect: false,
        // callbackUrl: '/',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      const response = await fetch('/api/register', {
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
      });

      // const data = await response.json();

      // login(data.email, data.password);

      // TODO: SET DATA NOT FROM SERVER
      login(email, password);
    } catch (e) {
      console.log(e);
    }
  };

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
    // confirmPassword: Yup.string().oneOf(
    //   [Yup.ref('password')],
    //   'check your password',
    // ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: authValidationSchema,

    onSubmit: async (values) => {
      const { firstName, lastName, email, password } = values;
      if (authVariant === 'login') {
        await login(email, password);
      } else {
        await register(firstName, lastName, email, password);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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

              {/* Вкладка Login */}
              <TabsContent value="login">
                <DialogTitle className="mt-4">Login</DialogTitle>
                <DialogDescription>
                  Sign in with your credentials
                </DialogDescription>

                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* ----------- Register ----------------*/}
              <TabsContent value="register">
                <DialogTitle className="mt-4">Register</DialogTitle>
                <DialogDescription>Create a new account</DialogDescription>

                {/* FIRSTNAME */}
                <div className="grid gap-2">
                  <Label htmlFor="reg-firstName">Enter your firstname</Label>
                  <Input
                    id="reg-firstName"
                    placeholder="Your first name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {/* LASTNAME */}
                <div className="grid gap-2">
                  <Label htmlFor="reg-lastName">Enter your lastName</Label>
                  <Input
                    id="reg-lastName"
                    placeholder="Your last name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {/* EMAIL */}
                <div className="grid gap-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="grid gap-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogHeader>
          <DialogFooter>
            {/* <DialogClose asChild>
            <button>Cancel</button>
          </DialogClose> */}
            <button type="submit">
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
