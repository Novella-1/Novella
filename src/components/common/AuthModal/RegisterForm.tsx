import { type FormikProps } from 'formik';
import React from 'react';
import { TypographyQD } from '@/components/ui/custom/typography';
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
      <DialogTitle className="pt-4 pb-2">Register</DialogTitle>
      <DialogDescription className="pb-2">
        Create a new account
      </DialogDescription>

      {/* FIRSTNAME */}
      <div className="grid gap-2 pt-2 pb-2">
        <Label htmlFor="reg-firstName">Enter your firstname</Label>
        <Input
          id="reg-firstName"
          placeholder="Your first name"
          name="firstName"
          className="pt-2 pb-2"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>
      </div>

      {/* LASTNAME */}
      <div className="grid gap-2">
        <Label
          htmlFor="reg-lastName"
          className="pt-2"
        >
          Enter your lastName
        </Label>
        <Input
          id="reg-lastName"
          placeholder="Your last name"
          name="lastName"
          className="pt-2 pb-2"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>
      </div>

      {/* EMAIL */}
      <div className="grid gap-2 pt-2">
        <Label
          htmlFor="reg-email"
          className="pt-2"
        >
          Email
        </Label>
        <Input
          id="reg-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className="pt-2 pb-2"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="min-h-[20px]">
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
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
        <div className="min-h-[20px]">
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
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
        <div className="min-h-[20px]">
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
