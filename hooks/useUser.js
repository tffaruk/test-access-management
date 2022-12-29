import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const useShowcase = () => {
  const { data } = useSWR(
    // "http://localhost:7003/testimonial/",
    "https://gethugothemes-backend.vercel.app/showcase",
    fetcher,
    {
      suspense: true,
    }
  );

  const filterByDraft = data.result.filter((data) => !data.draft);
  const sortByWeight = filterByDraft?.sort((a, b) => a.weight - b.weight);

  return {
    showcases: data.result,
    sortShowcase: sortByWeight,
  };
};

export default useShowcase;
