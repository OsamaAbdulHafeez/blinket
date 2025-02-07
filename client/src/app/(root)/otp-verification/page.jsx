"use client";
import summary from "@/common/summaryAPI";
import Axios from "@/utils/Axios";
import { AxiosToastError } from "@/utils/AxiosToastError";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
const OtpVerifyPage = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const validValue = data.every((el) => el);
  const router = useRouter();
  const [email, setEmail] = useState({});
  const localData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!localData) {
      redirect("/forgot-password");
    }
    setEmail(localData);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summary.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: email?.email,
        },
      });

      if (response?.data?.error) {
        toast.success(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData(["", "", "", "", "", ""]);
        router.push("/reset-password");
        localStorage.setItem("user", JSON.stringify({...localData,...response?.data}));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="container w-full mx-auto px-2">
      <div className="w-full bg-white max-w-lg my-4 mx-auto rounded p-7">
        <p className="text-2xl font-semibold text-green-700 text-center">
          Enter OTP
        </p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your otp :</label>
            <div className="flex items-center gap-2 justify-between">
              {data.map((ele, index) => {
                return (
                  <input
                    key={index}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    type="text"
                    id="otp"
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <Link
            href={"/forgot-password"}
            className="block ml-auto hover:text-primary-200"
          >
            Forgot password ?
          </Link>
          <button
            type="submit"
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>

        <p>
          Already have account ?
          <Link
            href={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerifyPage;
