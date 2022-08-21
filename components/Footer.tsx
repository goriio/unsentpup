import { FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 text-xs">
      <div className="flex items-center gap-4 container max-w-screen-lg mx-auto my-4 px-4 text-gray-300">
        <a
          href="https://github.com/goriio/unsentpup"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 text-gray-200 hover:text-blue-300 active:text-blue-400 transition ease-in-out duration-200"
        >
          <FaGithub />
          <span>Open Source</span>
        </a>
      </div>
    </footer>
  );
}
