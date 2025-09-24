import { LogIn } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { TypographyP } from '@/components/ui/custom/typography';

export const SignInPropositionWhenItemsExists = ({
  handleOpenChange,
}: {
  handleOpenChange: (value: boolean) => void;
}) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
      <TypographyP className="text-yellow-800 text-sm flex items-center gap-2">
        <LogIn className="w-4 h-4" />
        <Button
          className="underline font-medium cursor-pointer p-0"
          onClick={() => {
            handleOpenChange(false);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('openSignIn'));
            }, 300);
          }}
        >
          Sign in
        </Button>
        to save your cart and access it from any device
      </TypographyP>
    </div>
  );
};

export const SignInPropositionWhen0Items = ({
  handleOpenChange,
}: {
  handleOpenChange: (value: boolean) => void;
}) => {
  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <TypographyP className="text-blue-800 text-sm flex items-center justify-center gap-2">
        <LogIn className="w-4 h-4" />
        <Button
          className="p-0 cursor-pointer"
          onClick={() => {
            handleOpenChange(false);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('openSignIn'));
            }, 300);
          }}
        >
          Sign in
        </Button>
        to save your cart permanently
      </TypographyP>
    </div>
  );
};
