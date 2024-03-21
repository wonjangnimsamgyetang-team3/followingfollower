type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

import CloseIcon from '@/icons/CloseIcon';
import React from 'react';

export default function TodoModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-neutral-900/70 z-50"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-5 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
