"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "../searchBox";
import { FaRegCircleUser } from "react-icons/fa6";
import { useMobile } from "@/hooks/useMobile";
import { usePathname } from "next/navigation";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
const Header = () => {
  const location = usePathname();
  const [isMobile] = useMobile();
  const isSearch = location === "/search";
  const user = useSelector(state=>state.user)
  console.log(user,"user")
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearch && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/**logo */}
          <div className="h-full">
            <Link
              href={"/"}
              className="h-full flex justify-center items-center"
            >
              <Image
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <Image
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/**Search */}
          <div className="hidden lg:block">
            <SearchBox />
          </div>

          {/**login and my cart */}
          <div className="">
            <div className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={26} />
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <Link href={"/login"} className="text-lg px-2">Login</Link>
              <button className="flex items-center gap-2 px-3 py-3 bg-green-700 hover:bg-green-800 rounded text-white">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <SearchBox />
      </div>

      {/* {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )} */}
    </header>
  );
};

export default Header;
