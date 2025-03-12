import React from "react";
const SliderLoading = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-300 h-64 w-full animate-pulse rounded-md"></div>
      <div className="mt-2">
        <div className="bg-gray-300 h-4 w-3/4 animate-pulse rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 animate-pulse rounded mt-2"></div>
      </div>
    </div>
  );
};

export default SliderLoading;
