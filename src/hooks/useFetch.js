import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setLoading(false);
        setError("");
        setData(data);
        console.log(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    }
  }, [url]);

  return { data, loading, error};
};
