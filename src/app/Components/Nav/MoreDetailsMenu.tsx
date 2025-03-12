"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
const MoreDetailsMenu = ({
  categories,
  media,
}: {
  categories: string[];
  media: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:bg-background_hover  px-4 py-2  rounded-full transition-all hover:text-text_color flex items-center gap-1"
      >
        {media.toLowerCase()}
        <IoMdArrowDropdown />
      </button>

      {isOpen && (
        <div
          className={` absolute opacity-0 transition-all z-2 font-bold ${
            isOpen && `opacity-100`
          } inset-0 bg-secondary h-fit w-[200px] top-[50px] left-[10px] rounded-lg flex flex-col gap-1 text-center py-2 `}
        >
          {categories.map((category, i) => (
            <Link
              className="hover:bg-background_hover py-2 rounded-md"
              href={`/movie/${
                category.split(` `).length > 1
                  ? category.split(` `).join(`_`).toLowerCase()
                  : category.toLowerCase()
              }`}
              key={i}
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreDetailsMenu;
