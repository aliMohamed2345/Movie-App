"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
const MovieId = () => {
  const media = useSearchParams().get("media") || "";
  const id = useSearchParams().get("id") || "";
  const { data } = useFetch({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${media}/${+id}`,
    options: {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
      },
    },
  });
  console.log(data)
  return (
    <>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
      <p>hey</p>
    </>
  );
};

export default MovieId;
