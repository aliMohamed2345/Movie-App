import { useFetch } from "@/app/hooks/useFetch";
import { useEffect, useState } from "react";
import MediaCard from "../Media/MediaCard";
import MediaGridLoading from "../Loading/MediaGridLoading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
// import { FaRegSadCry } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { GiTv } from "react-icons/gi";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
interface mainCreditsProps {
  credits_id: number;
  character: string;
  profile_path: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
}
interface creditsDataProps {
  cast: mainCreditsProps[];
  crew: mainCreditsProps[];
  id: number;
}
function ActorCredits() {
  const dispatch = useDispatch();
  const { media } = useSelector((state: RootState) => state.Media);
  const { id } = useSelector((state: RootState) => state.Actor);
  const [creditsData, setCreditsData] = useState<creditsDataProps>();
  const [currentMedia, setCurrentMedia] = useState(media);
  const { data, loading } = useFetch<creditsDataProps>(
    {
      url: `https://api.themoviedb.org/3/person/${id}/${currentMedia}_credits?&include_adult=false`,
      options: {
        method: `GET`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
        },
      },
    },
    [currentMedia]
  );
  useEffect(() => {
    if (data) {
      setCreditsData(data);
    }
    dispatch(setMedia(currentMedia));
  }, [currentMedia, data, dispatch]);
  return (
    <>
      <h2 className="mt-10 text-movie_color text-4xl font-bold">Credits</h2>
      <div className="flex items-center justify-around w-[200px] sm:w-[300px] mt-4 md:w-[400px] lg:w-[500px] bg-secondary  rounded-full text-text_color   relative">
        <div
          className={`bg-movie_color absolute inset-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] ${
            currentMedia === "movie"
              ? `left-0`
              : `left-[90px] sm:left-[140px] md:left-[190px] lg:left-[240px]`
          } transition-all  rounded-full z-2 m-1 flex items-center justify-center`}
        >
          <button className="font-bold text-white mx-auto rounded-full">
            {currentMedia !== `movie` ? `TV` : `Movies`}
          </button>
        </div>
        <button
          onClick={() => {
            setCurrentMedia(`movie`);
          }}
          type="button"
          className="font-bold text-secondary_text_color  p-4 w-full rounded-full"
        >
          {/* {currentMedia} */}
          Movies
        </button>
        <button
          onClick={() => {
            setCurrentMedia(`tv`);
          }}
          type="button"
          className="font-bold text-secondary_text_color p-4 w-full rounded-full"
        >
          {/* {currentMedia} */}
          TV
        </button>
      </div>
      {loading ? (
        <MediaGridLoading />
      ) : (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 max-w-screen-lg mx-auto px-4">
            {creditsData?.cast &&
              creditsData?.cast?.length > 0 &&
              creditsData?.cast.map((mediaData, i) => {
                if (!mediaData.poster_path) return;
                return <MediaCard key={i} mediaData={mediaData} />;
              })}
          </div>
        </div>
      )}
      {creditsData?.cast && creditsData?.cast?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-6 my-16">
          {currentMedia === `movie` ? (
            <BiCameraMovie size={200} color="var(--movie_color)" />
          ) : (
            <GiTv size={200} color="var(--movie_color)" />
          )}
          <h2 className="text-lg sm:text-3xl font-bold text-center">
            The Actor Don&apos;t have any{" "}
            {currentMedia === `movie` ? `Movies` : `TV Shows`} Available
          </h2>
        </div>
      )}
    </>
  );
}

export default ActorCredits;
