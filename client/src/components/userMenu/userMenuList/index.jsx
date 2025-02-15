import summary from "@/common/summaryAPI";
import Divider from "@/components/divider";
import { logout } from "@/redux/userSlice";
import Axios from "@/utils/Axios";
import { AxiosToastError } from "@/utils/AxiosToastError";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExternalLink } from "react-icons/hi";
const UserMenuList = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...summary.logout_user,
      });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response?.data?.message);
        window.history.back();
      }
    } catch (error) {
      AxiosToastError(error.response.message);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div>My Account</div>
      <div className="text-sm flex items-center gap-1">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.name || user?.mobile}
        </span>
        <Link
          onClick={handleClose}
          href={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        <Link
          onClick={handleClose}
          href={"/dashboard/category"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Category
        </Link>
        <Link
          onClick={handleClose}
          href={"/dashboard/subcategory"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Sub category
        </Link>
        <Link
          onClick={handleClose}
          href={"/dashboard/product"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Product
        </Link>
        <Link
          onClick={handleClose}
          href={"/dashboard/upload-product"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Upload Product
        </Link>
        <Link
          onClick={handleClose}
          href={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          href={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenuList;
