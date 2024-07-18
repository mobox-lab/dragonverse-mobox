import { fetchTotalActiveEmdbl } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export function useFetchTotalActiveEmdbl() {
  return useQuery({
    queryKey: ['total-active-emdbl'],
    queryFn() {
      return fetchTotalActiveEmdbl();
    }
  });
}