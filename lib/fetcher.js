export const fetcher = async (...args) => {
  const res = await fetch(...args, {});
  const data = await res.json();

  return data;
};
