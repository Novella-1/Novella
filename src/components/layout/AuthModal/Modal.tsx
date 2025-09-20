'use client';
import React, { useState } from 'react';
import { UserIcon } from '@/components/ui/custom/icons';
import AuthModal from './AuthModal';

const Modal = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {/* <button onClick={() => setIsOpen(true)}>
        <UserIcon />
      </button> */}

      <AuthModal
      // isOpen={isOpen}
      // onClose={() => setIsOpen(false)}
      ></AuthModal>
    </div>
  );
};

export default Modal;
