import React, { useState } from "react";

function ImageUploader({
  labelTitle,
  containerStyle,
  defaultValue,
  updateFormValue,
  updateType,
}) {
  const [selectedImage, setSelectedImage] = useState(defaultValue);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      updateFormValue({ updateType, value: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`form-control w-full ${containerStyle}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label className="label">
        <span className="label-text text-base-content">{labelTitle}</span>
      </label>
      <div
        className={`h-40 input  input-bordered  border-2 border-dashed rounded-lg flex justify-center items-center  ${
          isDragOver ? "bg-gray-100" : ""
        }`}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-full max-w-full"
          />
        ) : (
          <span className="text-gray-400">
            Drag and drop image here or click to upload
          </span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <button
        className="btn btn-primary mt-2"
        onClick={() => document.querySelector("input[type=file]").click()}
      >
        Upload Image
      </button>
    </div>
  );
}

export default ImageUploader;
