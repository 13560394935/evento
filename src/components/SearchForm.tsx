"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/events/${searchText}`);
  };

  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
      <input
        value={searchText}
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-[#a4f839]/50 transition focus:ring-2 focus:bg-white/10"
        placeholder="Search events in any city..."
        spellCheck={false}
        onChange={(event) => setSearchText(event.target.value)}
      />
    </form>
  );
}
