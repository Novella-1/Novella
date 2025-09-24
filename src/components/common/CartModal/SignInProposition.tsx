import React from 'react';
import { Button } from '@/components/ui/button';
import { LogInIcon } from '@/components/ui/custom/icons';
import { TypographyP } from '@/components/ui/custom/typography';

export const SignInPropositionWhenItemsExists = ({
  handleOpenChange,
}: {
  handleOpenChange: (value: boolean) => void;
}) => {
  return (
    <div className="bg-custom-icons rounded-md p-3">
      <Button
        className=" font-medium cursor-pointer p-0"
        onClick={() => {
          handleOpenChange(false);
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openSignIn'));
          }, 300);
        }}
      >
        <TypographyP className="text-custom-header-footer text-sm flex items-center gap-2">
          <LogInIcon className="w-4 h-4" />
          Sign in to save your cart and access it from any device
        </TypographyP>
      </Button>
    </div>
  );
};

export const SignInPropositionWhen0Items = ({
  handleOpenChange,
}: {
  handleOpenChange: (value: boolean) => void;
}) => {
  return (
    <div className="mt-4 p-3 bg-custom-header-footer rounded-lg">
      <Button
        className="p-0 cursor-pointer"
        onClick={() => {
          handleOpenChange(false);
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openSignIn'));
          }, 300);
        }}
      >
        <TypographyP className="text-custom-primary-text text-sm flex items-center justify-center gap-2">
          <LogInIcon className="w-4 h-4" />
          Sign in to save your cart permanently
        </TypographyP>
      </Button>
    </div>
  );
};
