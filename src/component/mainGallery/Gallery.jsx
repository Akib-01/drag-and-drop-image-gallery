import React, { useState } from "react";
import GalleryData from "../gallary_data/gallaryData";
import GalleryItem from "./GalleryItem";
import ImageSelection from "./ImageSelection";
import ImageUpload from "./ImageUpload";

function Gallery() {
  // Initialize images
  const initialImages = GalleryData.images.map((image, index) => {
    return { ...image, isFeatured: index === 0, isSelected: false };
  });
  const [images, setImages] = useState(initialImages);

  // Function to move an image
  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const movedImage = updatedImages[fromIndex];
    updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);

    // Update isFeatured status
    updatedImages.forEach((image, index) => {
      image.isFeatured = index === 0;
    });

    setImages(updatedImages);
  };

  // Function to handle image selection
  const handleImageSelect = (id, selected) => {
    const updatedImages = [...images];
    const image = updatedImages.find((img) => img.id === id);
    if (image) {
      image.isSelected = selected;
    }
    setImages(updatedImages);
  };

  // Function to handle image upload
  const handleImageUpload = (uploadedImage) => {
    const updatedImages = [...images, uploadedImage];
    updatedImages.forEach((image) => (image.isSelected = false));
    setImages(updatedImages);
  };

  // Function to delete selected images
  const handleDeleteSelected = () => {
    const updatedImages = images.filter((image) => !image.isSelected);
    setImages(updatedImages);
  };

  // Get selected images
  const selectedImages = images.filter((image) => image.isSelected);

  return (
    <div className="border rounded p-4">
      {/* Image selection and delete */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <ImageSelection selectedImages={selectedImages} />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            image={image}
            index={index}
            moveImage={moveImage}
            onImageSelect={handleImageSelect}
          />
        ))}
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>
    </div>
  );
}

export default Gallery;
