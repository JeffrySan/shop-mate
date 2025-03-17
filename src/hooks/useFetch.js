import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setData(data);
      console.log(data);
    };

    fetchData();
  }, [url]);

  return { data, loading };
};
