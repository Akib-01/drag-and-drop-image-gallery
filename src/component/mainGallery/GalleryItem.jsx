import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const GalleryItem = ({ image, index, moveImage, onImageSelect }) => {
  // State for whether the image is featured, selected, or hovered
  const isFeatured = image.isFeatured;
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // DnD setup for dropping images
  const [, ref] = useDrop({
    accept: "image",
    hover(item) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  // DnD setup for dragging images
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { id: image.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Handle image selection
  const handleSelect = () => {
    setIsSelected(!isSelected);
    onImageSelect(image.id, !isSelected);
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Styles for the image container
  const imageStyle = `relative rounded-lg overflow-hidden shadow-md ${
    isFeatured ? "col-span-2 row-span-2" : "col-span-1 row-auto"
  } w-full h-full border-2 border-black transition-transform duration-200 transform ${
    isDragging ? "scale-105" : "scale-100"
  }`;

  // Styles for the overlay
  const overlayStyle = `absolute top-0 left-0 w-full h-full pointer-events-none ${
    isSelected || isHovered ? "bg-black bg-opacity-40" : "bg-transparent"
  }`;

  // Styles for the checkbox
  const checkboxStyle = `w-6 h-6 rounded-md absolute top-2 left-2 z-10 opacity-0 hover:opacity-100 ${
    isSelected || isHovered ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div
      ref={(node) => {
        ref(drag(node));
      }}
      className={imageStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={overlayStyle}></div>
      <div className={checkboxStyle}>
        <input type="checkbox" checked={isSelected} onChange={handleSelect} />
      </div>
      <img src={image.path} alt={image.caption} className="w-full h-auto" />
    </div>
  );
};

export default GalleryItem;
