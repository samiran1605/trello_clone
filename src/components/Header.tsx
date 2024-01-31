"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "../../store/BoardStore";
import fetchSuggestion from "../../lib/fetchSuggestion";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
    fetchSuggestionFunc();
  }, [board]);

  return (
    <header className="">
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 ">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#4B1447] to-[#E7B976] -z-10 filter blur-2xl opacity-45" />
        <Image
          src="https://res.cloudinary.com/studiovity/image/upload/v1687753565/Trello%20clone/Trello-logo-blue.svg_kkvxtf.png"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 pb-10 md:w-56 md:p-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Search Bar */}
          {/* Icons */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 " />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* Avatar */}
          <Avatar name="Samiran Biswas" round size="50" color="#0055D1" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm p-2 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your task for the day..."}
        </p>
      </div>
    </header>
  );
}

export default Header;
