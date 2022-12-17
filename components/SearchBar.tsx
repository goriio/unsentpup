import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';

export function SearchBar() {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length > 50) return;
    setSearch(value);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!search) {
      toast.error('Search input is empty');
      return;
    }
    push(`/search/${search}`);
    setSearch('');
  }

  return (
    <form className="relative w-full md:w-auto" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="w-full pl-8 pr-4 py-2 border-none bg-slate-700 rounded-md text-slate-300 text-sm"
        value={search}
        onChange={handleSearchChange}
        aria-label="Search"
        placeholder="Search for names, tags, or messages"
      />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-slate-300 ">
        <BiSearch />
      </span>
    </form>
  );
}
