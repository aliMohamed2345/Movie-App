import { RootState } from "@/app/redux/store";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
const SeeMore = ({ category }: { category: string }) => {
  const { media } = useSelector((state: RootState) => state.Media);
  return (
    <Link
      href={{
        pathname: `/${media}/${category}`,
        query: { media, category },
      }}
      className="flex flex-col justify-center  gap-10 bg-secondary items-center h-full min-h-[425px] rounded-lg"
    >
      <h4 className="font-bold text-xl">Discover More</h4>
      <FaPlus size={100} />
    </Link>
  );
};

export default SeeMore;
