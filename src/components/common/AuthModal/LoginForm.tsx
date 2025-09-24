import { type FormikProps } from 'formik';
import React from 'react';
import { TypographyP } from '@/components/ui/custom/typography';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormValues } from '@/types/AuthFormValues';

type LoginFormProps = {
  formik: FormikProps<AuthFormValues>;
};

const LoginForm = ({ formik }: LoginFormProps) => {
  return (
    <>
      <div className="text-center">
        <DialogTitle className="pt-4 text-md text-custom-primary-text">
          Login
        </DialogTitle>
        <DialogDescription className="mb-4 text-xs text-custom-primary-text">
          Sign in with your credentials
        </DialogDescription>
      </div>

      <div className="grid gap-2 pt-2 pb-2">
        <Label
          className="text-custom-primary-text"
          htmlFor="login-email"
        >
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          name="email"
          className="py-1 text-custom-primary-text border-custom-border border bg-custom-header-footer"
          placeholder="your@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.email && formik.errors.email && (
            <TypographyP className="text-red-400 text-xs">
              {formik.errors.email}
            </TypographyP>
          )}
        </div>
      </div>
      <div className="grid gap-2 pt-2 pb-2">
        <Label
          className="text-custom-primary-text"
          htmlFor="login-password"
        >
          Password
        </Label>
        <Input
          id="login-password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-custom-primary-text border-custom-border border bg-custom-header-footer"
          placeholder="******"
        />
        <div className="min-h-[20px]">
          {formik.touched.password && formik.errors.password && (
            <TypographyP className="text-red-400 text-xs">
              {formik.errors.password}
            </TypographyP>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
