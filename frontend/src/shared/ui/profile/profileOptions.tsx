import { PROFILE_LABELS } from "@/shared/constants/profile";
import { ProfileValue } from "@/shared/constants/profile";
import { GridOption } from "@/shared/components/GridSelectCard";
import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";

const PROFILE_ICONS: Record<ProfileValue, JSX.Element> = {
  CAT: <CatIcon className="w-12 h-12" />,
  CHICK: <ChickIcon className="w-12 h-12" />,
  DINOSAUR: <DinosaurIcon className="w-12 h-12" />,
  DOG: <DogIcon className="w-12 h-12" />,
  RABBIT: <RabbitIcon className="w-12 h-12" />,
};

export const PROFILE_OPTIONS_UI: GridOption<ProfileValue>[] = (
  Object.keys(PROFILE_LABELS) as ProfileValue[]
).map((value) => ({
  value,
  label: PROFILE_LABELS[value],
  icon: PROFILE_ICONS[value],
}));
