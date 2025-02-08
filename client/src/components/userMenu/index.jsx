"use client";
import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenuList from "./userMenuList";
const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setOpenUserMenu((prev) => !prev)}
        className="flex select-none items-center gap-1 cursor-pointer"
      >
        <p>Account</p>
        {openUserMenu ? (
          <GoTriangleUp size={25} />
        ) : (
          <GoTriangleDown size={25} />
        )}
      </div>
      {openUserMenu && (
        <div className="absolute right-0 top-12">
          <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
            <UserMenuList />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
