"use client";
import summary from "@/common/summaryAPI";
import { updatedAvatar } from "@/redux/userSlice";
import Axios from "@/utils/Axios";
import { AxiosToastError } from "@/utils/AxiosToastError";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleProfileAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    ta = new FormData();
    formData.append("avatar", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...summary.upload_avatar,
        data: formData,
      });
      dispatch(updatedAvatar(response.data.data.avatar));
      toast.success(response.data.message);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex justify-center items-center">
      <div className="bg-white max-w-sm w-full flex flex-col justify-center items-center">
        <button onClick={close} className="text-neutral-800 block w-fit ml-auto">
          <IoClose size={25} />
        </button>
        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
          {user.avatar ? (
            <Image src={user?.avatar} alt="image" height={80} width={80} />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <p className="border cursor-pointer px-3 py-1 border-primary-200 hover:bg-primary-200 rounded my-3">
              {loading ? "Loading..." : "Upload"}
            </p>
          </label>
          <input
            onChange={handleProfileAvatar}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
