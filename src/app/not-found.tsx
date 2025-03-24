"use client";

import Link from "next/link";
import { BiCameraMovie } from "react-icons/bi";

const NotFoundPage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black bg-primary">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <BiCameraMovie size={100} className="text-movie_color animate-pulse" />
        <h1 className="sm:text-5xl text-xl font-bold text-movie_color mt-4">
          404 - Page Not Found
        </h1>
        <p className="text-sm sm:text-xl text-text_color mt-4 max-w-md">
          The page you’re trying to find doesn&apos;t exist
        </p>

        {/* Home Button */}
        <Link href="/movie">
          <button className="mt-6 bg-movie_color hover:bg-movie_color_hover text-white text-lg font-semibold px-6 py-3 rounded-lg transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
