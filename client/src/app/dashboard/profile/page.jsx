"use client";
import summary from "@/common/summaryAPI";
import UserProfileAvatarEdit from "@/components/userProfileAvatarEdit";
import { setUserDetails } from "@/redux/userSlice";
import Axios from "@/utils/Axios";
import { AxiosToastError } from "@/utils/AxiosToastError";
import fetchUserDetails from "@/utils/fetchUserDetails";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
  });
  useEffect(() => {
    setUserData({
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    });
  }, [user]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await Axios({
        ...summary.update_user_details,
          data : userData
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          const userData = await fetchUserDetails()
          dispatch(setUserDetails(userData.data))
      }

  } catch (error) {
    console.log(error)
      AxiosToastError(error)
  } finally{
      setLoading(false)
  }
  };
  return (
    <div>
      {/* Profile Picture */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
        {user.avatar ? (
          <Image src={user?.avatar} alt="image" height={80} width={80} />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm min-w-[80px] border border-primary-100 hover:border-primary-200 hover:bg-primary-200 mt-3 px-3 py-1 rounded-full"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}
      {/* name ,email,password */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
