"use client";
import UploadCategoryModal from "@/components/uploadCategoryModal";
import React, { useState } from "react";

const CategoryPage = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenCategoryModal(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {openCategoryModal && (
        <UploadCategoryModal close={() => setOpenCategoryModal(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
