"use client";
import summary from "@/common/summaryAPI";
import Axios from "@/utils/Axios";
import { AxiosToastError } from "@/utils/AxiosToastError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const ForgotPasswordPage = () => {
  const [data, setData] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const validValue = Object.values(data).every((el) => el);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summary.forgotPassword,
        data: data,
      });

      if (response?.data?.error) {
        toast.success(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        router.push(`/otp-verification`)
        localStorage.setItem('user',JSON.stringify(data))
        setData({
          email: "",
        });
      }
    } catch (error) {
        console.log(error)
      AxiosToastError(error);
    }
  };
  return (
    <section className="container w-full mx-auto px-2">
      <div className="w-full bg-white max-w-lg my-4 mx-auto rounded p-7">
        <p className="text-2xl font-semibold text-green-700 text-center">Forgot Password</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <Link href={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
          <button
            type="submit"
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Send Otp
          </button>
        </form>

        <p>
          Already have account ?
          <Link href={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
