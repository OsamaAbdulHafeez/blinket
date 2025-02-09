"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "../searchBox";
import { FaRegCircleUser } from "react-icons/fa6";
import { useMobile } from "@/hooks/useMobile";
import { usePathname, useRouter } from "next/navigation";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchUserDetails from "@/utils/fetchUserDetails";
import { setUserDetails } from "@/redux/userSlice";
import UserMenu from "../userMenu";
const Header = () => {
  const location = usePathname();
  const [isMobile] = useMobile();
  const dispatch = useDispatch()
  const router = useRouter()
  const isSearch = location === "/search";
  const user = useSelector(state=>state.user)

  useEffect(()=>{
    const fetch = async() =>{
      const fetch = await fetchUserDetails()
      dispatch(setUserDetails(fetch?.data))
    }
    fetch()
  },[])

  const handleMobileUser = () =>{
      if(!user?._id){
        router.push('/login')
        return
      }
      router.push('/user')
  }
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
            <div className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
              <FaRegCircleUser size={26} />
            </div>
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <UserMenu/>
              ) : (
                <Link href={"/login"} className="text-lg px-2">Login</Link>
              )}
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
