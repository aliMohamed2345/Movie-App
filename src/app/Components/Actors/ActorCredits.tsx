import { useFetch } from "@/app/hooks/useFetch";
import { useState } from "react";

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
function ActorCredits({ media, id }: { media: string; id: number }) {
  //   const [creditsData, setCreditsData] = useState<creditsDataProps>();
  const [currentMedia, setCurrentMedia] = useState(media);
  console.log(currentMedia);
  const { data } = useFetch<creditsDataProps>({
    url: `https://api.themoviedb.org/3/person/${id}/${media}_credits?&include_adult=false`,
    options: {
      method: `GET`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  //   useEffect(() => {
  //     setCreditsData(data);
  //   }, [data]);
  console.log(data?.cast);
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
          <button className="font-bold text-secondary_text_color mx-auto rounded-full">
            {currentMedia !== `movie` ? `movie` : `tv`}
          </button>
        </div>
        <button
          onClick={() => {
            setCurrentMedia(`movie`);
          }}
          type="button"
          className="font-bold text-secondary_text_color  p-4 w-full rounded-full"
        >
          {currentMedia}
        </button>
        <button
          onClick={() => {
            setCurrentMedia(`tv`);
          }}
          type="button"
          className="font-bold text-secondary_text_color p-4 w-full rounded-full"
        >
          {currentMedia}
        </button>
      </div>
      {/* <MediaCard mediaData={data?.cast} /> */}
      {/* <MediaCard mediaData={data?.cast} /> */}
    </>
  );
}

export default ActorCredits;
