import React from "react";

const ImageSelection = ({ selectedImages }) => {
  return (
    <div>
      <p>{selectedImages.length} images selected</p>
    </div>
  );
};

export default ImageSelection;
