import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
interface SeeMoreProps {
  media: `movie` | `tv`;
  category: string;
}
const SeeMore = ({ media, category }: SeeMoreProps) => {
  return (
    <Link
      href={`/${media}/${category}`}
      className="flex flex-col justify-center gap-10 bg-secondary items-center h-[460px] rounded-sm"
    >
      <h4 className="font-bold">Discover More</h4>
      <FaPlus size={100} />
    </Link>
  );
};

export default SeeMore;
