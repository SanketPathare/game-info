"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SearchBar({ initialSearch = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();

  // Update searchTerm when initialSearch changes
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mb-6 mt-20"
    >
      <input
        type="text"
        placeholder="Search for games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded-l-md w-full md:w-[30%] bg-neutral-900 outline-none border border-neutral-800 "
      />
      <button
        type="submit"
        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-r-md border border-neutral-800   "
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
