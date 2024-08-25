import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useProducts = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: () =>
        makeRequest.get(`/products`).then((res) => res.data),
    });
  };