"use client";

import summary from "@/common/summaryAPI";
import Axios from "@/utils/Axios";
import { AxiosToastError } from "@/utils/AxiosToastError";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
const ResetPasswordPage = () => {
  const router = useRouter();
  const localData = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!(localData.success && localData.email)) {
      redirect("/");
    }
    if (localData.email) {
      setData((prev) => {
        return {
          ...prev,
          email: localData.email,
        };
      });
    }
  }, []);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const validValue = Object.values(data).every((el) => el);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("new password and confirm password must be same");
      return;
    }
    try {
      const response = await Axios({
        ...summary.reset_password,
        data: data,
      });

      if (response?.data?.error) {
        toast.error(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };
  return (
    <section className="container w-full mx-auto px-2">
      <div className="w-full bg-white max-w-lg my-4 mx-auto rounded p-7">
        <p className="text-2xl font-semibold text-green-700 text-center">
          Reset Your Password
        </p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="password">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword?.password ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-transparent"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your new password"
              />
              <div
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
                className="cursor-pointer"
              >
                {showPassword?.password ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="cPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword?.confirmPassword ? "text" : "password"}
                id="cPassword"
                className="w-full outline-none bg-transparent"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
              />
              <div
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                className="cursor-pointer"
              >
                {showPassword?.confirmPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
