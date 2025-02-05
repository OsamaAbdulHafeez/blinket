"use client";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import TypeAnimations from "../typeAnimation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMobile } from "@/hooks/useMobile";
const SearchBox = () => {
  const location = usePathname();
  const [isMobile] = useMobile();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  return (
      <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-600 bg-slate-50 group focus-within:border-primary-200">
        <div>
          {
            (isSearchPage && isMobile) ? (
              <Link href={'/'} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
                <FaArrowLeft size={20} />
              </Link>
            ) : (
              <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
                <IoSearch size={22} />
              </button>
            )
          }
        </div>
        <div className="w-full h-full">
          {!isSearchPage ? (
            <Link href={"/search"}
              className="w-full h-full flex items-center"
            >
              <TypeAnimations/>
            </Link>
          ) : (
            <div className="w-full h-full">
              <input
                type="text"
                placeholder="Search for atta dal and more."
                autoFocus
                // defaultValue={searchText}
                className="bg-transparent w-full h-full outline-none"
                // onChange={handleOnChange}
              />
            </div>
          )}
        </div>
      </div>
  );
};

export default SearchBox;
