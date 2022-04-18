import { fetchSafeboxes } from "./fetchSafeboxes";
import { fetchTokenFactors } from "./fetchTokenFactors";

export const fetch = async (): Promise<void> => {
  await fetchSafeboxes();
  await fetchTokenFactors();
};

fetch().catch((err) => {
  console.error(err);
});
