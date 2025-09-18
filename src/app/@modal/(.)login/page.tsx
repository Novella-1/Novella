import React from 'react';
import LoginForm from '@/components/common/LoginForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const LoginModal = () => {
  return (
    <Dialog
      open={true}
      // onOpenChange={handleClose}
    >
      <DialogContent className="sm:max-w-[425px]">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
