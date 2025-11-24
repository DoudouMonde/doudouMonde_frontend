import { CHILD_PROFILE_LABELS } from "@/shared/constants/childProfile";
import { ProfileValue } from "@/shared/constants/profile";
import { GridOption } from "@/shared/components/GridSelectCard";
import {
  CatProfile,
  ChickProfile,
  DinoProfile,
  DogProfile,
  RabbitProfile,
  DoudouProfile,
} from "@/assets/icons/childProfileImg";
import { ChildProfileValue } from "@/shared/constants/childProfile";
// import {
//   CatIcon,
//   ChickIcon,
//   DinosaurIcon,
//   DogIcon,
//   RabbitIcon,
// } from "@/assets/icons/profile";

const PROFILE_ICONS: Record<ChildProfileValue, JSX.Element> = {
  CAT: <CatProfile className="w-16 h-16" />,
  CHICK: <ChickProfile className="w-16 h-16" />,
  DINOSAUR: <DinoProfile className="w-16 h-16" />,
  DOG: <DogProfile className="w-16 h-16" />,
  RABBIT: <RabbitProfile className="w-16 h-16" />,
  DOUDOU: <DoudouProfile className="w-16 h-16" />,
};

export const PROFILE_OPTIONS_UI: GridOption<ChildProfileValue>[] = (
  Object.keys(CHILD_PROFILE_LABELS) as ProfileValue[]
).map((value) => ({
  value,
  label: CHILD_PROFILE_LABELS[value],
  icon: PROFILE_ICONS[value],
}));
