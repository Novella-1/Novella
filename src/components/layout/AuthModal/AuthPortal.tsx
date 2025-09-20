'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const AuthPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(children, modalRoot) : null;
};

export default AuthPortal;
