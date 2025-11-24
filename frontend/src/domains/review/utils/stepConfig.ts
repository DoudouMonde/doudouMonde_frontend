import { NewReviewData } from "@/pages/review/ReviewFunnelPage";

export const STEP_FIELDS = {
  performanceSelect: ["performanceId", "performanceName"],
  childDateSelect: ["children", "watchDate"],
  photoTextReview: [
    "performanceName",
    "children",
    "watchDate",
    "reviewText",
    "uploadedImages"
  ],
  typeSelect: ["typeOption"],
  emotionSelect: ["typeOption", "emotionOption"],
  accSelect: ["typeOption", "emotionOption", "accOption"],
  charName: ["performanceName",  "watchDate", "typeOption", "emotionOption", "accOption", "charName"],
} as const;

// Helper
export function pickStepData<T, K extends readonly (keyof T)[]>(
  data: T,
  keys: K
): StepField<T, K> {
  const result: any = {};
  keys.forEach((key) => {
    result[key] = data[key];
  });
  return result;
}


export type StepField<T, K extends readonly (keyof T)[]> = {
  [P in K[number]]: T[P];
};

