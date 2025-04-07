"use client";
import MediaTemplate from "@/app/Components/Media/MediaTemplate";
import { setGenre, setMedia } from "@/app/redux/Slices/MediaSlice";
import { setURL } from "@/app/redux/Slices/SearchSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const GenreId = () => {
  const genre = useSearchParams().get("genre");
  const media = useSearchParams().get(`media`);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMedia(media));
    dispatch(setGenre(genre));
    dispatch(
      setURL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/discover/${media}`)
    );
  }, [dispatch, media, genre]);
  return <MediaTemplate />;
};

export default GenreId;
