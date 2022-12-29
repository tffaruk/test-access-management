import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const useTestimonial = () => {
  const { data } = useSWR(
    // "http://localhost:7003/testimonial/",
    "https://gethugothemes-backend.vercel.app/testimonial/",
    fetcher,
    {
      suspense: true,
    }
  );

  const filterByDraft = data.result.filter((data) => !data.draft);
  const sortByWeight = filterByDraft?.sort((a, b) => a.weight - b.weight);

  return {
    testimonials: data.result,
    sortTestimonial: sortByWeight,
  };
};

export default useTestimonial;
