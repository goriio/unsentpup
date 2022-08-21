import Link from 'next/link';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaEnvelopeOpen } from 'react-icons/fa';
import { Button } from './Button';
import PostForm from './PostForm';

export function Header() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 left-0 right-0 border-b border-gray-800 bg-slate-900 z-20">
      <div className="flex items-center justify-between max-w-screen-lg h-16 container mx-auto md px-4 py-2">
        <Link href="/">
          <h1 className="flex items-center gap-2 font-bold text-lg text-slate-400 cursor-pointer">
            <FaEnvelopeOpen />
            <span>unsentpup</span>
          </h1>
        </Link>
        <Button icon={<BiPlus />} onClick={() => setOpen(true)}>
          Submit
        </Button>
      </div>
      <PostForm isOpen={open} setIsOpen={setOpen} />
    </header>
  );
}
