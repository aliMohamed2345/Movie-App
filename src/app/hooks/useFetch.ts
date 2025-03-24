/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";

interface UseFetchProps {
  url: string | null;
  options?: RequestInit;
  dependencies?: unknown[];
}

export const useFetch = <T>({
  url, options = {}, dependencies = [],
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}: UseFetchProps, _p0?: string[]) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!url) return; // Prevents running fetch when url is null

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...(dependencies||[])]); 

  return { data, error, loading };
};
