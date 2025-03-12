import { useState } from "react";
// import { FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ActorInfo = ({ biography }: { biography: string }) => {
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsInfoMenuOpen(true)}
        title="see more information"
        className="p-2 hover:bg-movie_color_hover text-white transition-all bg-movie_color rounded-md mt-4 w-40 font-bold"
      >
        See more
      </button>
      {isInfoMenuOpen && (
        <div
          onClick={() => setIsInfoMenuOpen(false)}
          className="fixed inset-0 bg-black/80 z-10"
        ></div>
      )}
      <div
        className={`w-[80vw] h-auto overflow-y-auto z-10 bg-primary duration-300 transform -translate-x-1/2 -translate-y-1/2 fixed left-[50%] text-text_color transition-all ${
          isInfoMenuOpen
            ? `opacity-100 scale-100 top-[50%]`
            : `opacity-0 scale-0 top-[-300px]`
        } rounded-lg container mx-auto`}
      >
        <button
          title="close"
          onClick={() => setIsInfoMenuOpen(false)}
          className="block justify-self-end p-2 m-3 rounded-full transition-all hover:bg-background_hover w-8 h-8"
        >
          <MdClose className="text-text_color" />
        </button>
        <div className="flex gap-3 mt-4 mx-auto justify-around items-center flex-col lg:flex-row md:flex-row">
          <p className="text-center">{biography}</p>
        </div>
        {/* <div className="flex gap-3 mt-4 mx-auto justify-around items-center flex-col lg:flex-row md:flex-row">
        </div>
        <div className="flex items-center my-4 justify-center gap-3 flex-wrap">
        </div> */}
      </div>
    </>
  );
};

export default ActorInfo;
