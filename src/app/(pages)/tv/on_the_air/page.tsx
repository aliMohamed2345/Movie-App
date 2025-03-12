"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setCategory, setMedia } from "@/app/redux/Slices/MediaSlice";
import MediaTemplate from "@/app/Components/Media/MediaTemplate";
import { useDispatch } from "react-redux";
import { setURL } from "@/app/redux/Slices/SearchSlice";
const OnTheAirTV = () => {
  const dispatch = useDispatch();
  const media = useSearchParams().get("media") || "";
  const category = useSearchParams().get("category") || "";

  useEffect(() => {
    dispatch(setMedia(media));
    dispatch(setCategory(category));
    dispatch(
      setURL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${category}`)
    );
  }, [dispatch, media, category]);

  return <MediaTemplate />;
};

export default OnTheAirTV;
