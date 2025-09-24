import { type FormikProps } from 'formik';
import React from 'react';
import { TypographyQD } from '@/components/ui/custom/typography';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormValues } from '@/types/AuthFormValuesType';

type LoginFormProps = {
  formik: FormikProps<AuthFormValues>;
};

const LoginForm = ({ formik }: LoginFormProps) => {
  return (
    <>
      <DialogTitle className="pt-4 pb-2">Login</DialogTitle>
      <DialogDescription className="pb-2">
        Sign in with your credentials
      </DialogDescription>

      <div className="grid gap-2">
        <Label
          className="pt-2 pb-2"
          htmlFor="login-email"
        >
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          name="email"
          className="pt-2 pb-2"
          placeholder="you@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.email && formik.errors.email && (
            <TypographyQD className="text-red-500 text-sm">
              {formik.errors.email}
            </TypographyQD>
          )}
        </div>
      </div>
      <div className="grid gap-2 pt-2 pb-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
