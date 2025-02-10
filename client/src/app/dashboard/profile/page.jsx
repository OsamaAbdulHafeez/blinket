"use client"
import UserProfileAvatarEdit from "@/components/userProfileAvatarEdit";
import Image from "next/image";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
const ProfilePage = () => {
  const user = useSelector(state=>state.user)
  const [openProfileAvatarEdit,setOpenProfileAvatarEdit] = useState(false)
  return (
    <div>
        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
          {
            user.avatar ? (
              <Image src={user?.avatar} alt="image" height={80} width={80}/>
            ) : (
              <FaRegUserCircle size={65}/>
            )
          }
        </div>
        <button onClick={()=>setOpenProfileAvatarEdit(true)} className="text-sm min-w-[80px] border border-primary-100 hover:border-primary-200 hover:bg-primary-200 mt-3 px-3 py-1 rounded-full">Edit</button>
        {openProfileAvatarEdit && <UserProfileAvatarEdit close={()=>setOpenProfileAvatarEdit(false)}/>}
    </div>
  );
};

export default ProfilePage;