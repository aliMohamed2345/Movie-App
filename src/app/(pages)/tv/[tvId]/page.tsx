"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMediaId } from "@/app/redux/Slices/MediaDataSlice";
import { setMedia } from "@/app/redux/Slices/MediaSlice";
import MediaIdTemplate from "@/app/Components/Media/MediaIdTemplate";
const MovieId = () => {
  const dispatch = useDispatch();
  const media = useSearchParams().get("media") || "";
  const id = useSearchParams().get("id") || "";

  useEffect(() => {
    dispatch(setMedia(media));
    dispatch(setMediaId(id));
  }, [dispatch, media, id]);

  return <MediaIdTemplate />;
};

export default MovieId;
