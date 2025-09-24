import { type FormikProps } from 'formik';
import React from 'react';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormValues } from '@/types/AuthFormValuesType';

type RegisterFormProps = {
  formik: FormikProps<AuthFormValues>;
};

const RegisterForm = ({ formik }: RegisterFormProps) => {
  return (
    <>
      <div className="text-center">
        <DialogTitle className="pt-4 text-md text-custom-primary-text">
          Register
        </DialogTitle>
        <DialogDescription className="mb-4 text-xs text-custom-primary-text">
          Create a new account
        </DialogDescription>
      </div>

      <div className="grid gap-2 pt-2 pb-2">
        <Label
          htmlFor="reg-firstName"
          className="text-custom-primary-text"
        >
          Enter your first name
        </Label>
        <Input
          id="reg-firstName"
          placeholder="Your first name"
          name="firstName"
          className="py-1 text-custom-primary-text border-custom-border border bg-custom-header-footer"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-400 text-xs">{formik.errors.firstName}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2 pt-2 pb-2">
        <Label
          htmlFor="reg-lastName"
          className="text-custom-primary-text"
        >
          Enter your last name
        </Label>
        <Input
          id="reg-lastName"
          placeholder="Your last name"
          name="lastName"
          className="text-custom-primary-text border-custom-border border bg-custom-header-footer"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-400 text-xs">{formik.errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2 pt-2 pb-2">
        <Label
          htmlFor="reg-email"
          className="text-custom-primary-text"
        >
          Email
        </Label>
        <Input
          id="reg-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className="text-custom-primary-text border-custom-border border bg-custom-header-footer"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-xs">{formik.errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2 pt-2 pb-2">
        <Label
          htmlFor="reg-password"
          className="text-custom-primary-text"
        >
          Password
        </Label>
        <Input
          id="reg-password"
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
            <p className="text-red-400 text-xs">{formik.errors.password}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2 pt-2 pb-2">
        <Label
          htmlFor="confirmPassword"
          className="text-custom-primary-text"
        >
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-custom-primary-text border-custom-border border bg-custom-header-footer"
        />
        <div className="min-h-[20px]">
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-400 text-xs">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
