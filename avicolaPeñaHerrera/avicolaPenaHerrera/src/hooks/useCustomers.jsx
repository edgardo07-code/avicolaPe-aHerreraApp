import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () =>
      makeRequest.get(`/customers`).then((res) => res.data),
  });
};