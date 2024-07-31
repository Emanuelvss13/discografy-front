import axios from "axios";
import useSWR from "swr";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export function useFetch<Data>(url: string) {
  const { data, error } = useSWR<Data>(url, async (url: string) => {
    const response = await api.get(url);

    return response.data;
  });

  console.log(data);

  return { data, error };
}
