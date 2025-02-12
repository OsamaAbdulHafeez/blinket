"use client";
import { uploadImage } from "@/utils/uploadImage";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const UploadCategoryModal = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCategoryImage = async(e) =>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        const uplaod = await uploadImage(file)

        console.log(uplaod,"uplaod")
  }
  return (
    <section className="fixed p-4 top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl p-4 rounded">
        <div className="flex items-center justify-center">
          <h1 className="font-semibold">Category</h1>
          <button
            onClick={close}
            className="text-neutral-800 block w-fit ml-auto"
          >
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              onChange={handleOnChange}
              placeholder="Enter category Name"
              value={data.name}
              name="name"
              className="bg-blue-100 p-2 border border-blue-100 focus-within:border-x-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-100 h-36 w-full lg:w-36 flex justify-center items-center">
                <p className="text-sm text-neutral-500">No Image</p>
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  disabled={!data.name}
                  className={`${!data.name
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-200"
                  } px-4 py-2 rounded`}
                >
                  Upload Image
                </div>
                <input type="file" id="uploadCategoryImage" className="hidden" onChange={handleCategoryImage}/>
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModal;
