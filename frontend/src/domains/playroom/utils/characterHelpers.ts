import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import * as CrownCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/crown";
import * as CapCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/cap";
import * as FlowerCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/flower";
import * as GlassesCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/glasses";
import * as RibbonCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/ribbon";
import * as WizhatCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/wizhat";

const toPascalCase = (value: string) => {
  if (!value) return "";
  const lower = value.toLowerCase(); // CAT → cat
  return lower.charAt(0).toUpperCase() + lower.slice(1); // cat → Cat
};

export const getEmotionCharacter = (animal: string, emotion: string) => {
  const animalName = toPascalCase(animal);
  const emotionName = toPascalCase(emotion);
  const componentName = `${animalName}${emotionName}`;

  const mappedComponentName = componentName.replace("Onemore", "Onemore");

  return (
    EmotionCharacters as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[mappedComponentName];
};

const accessoryModules = {
  CROWN: CrownCharacters,
  CAP: CapCharacters,
  FLOWER: FlowerCharacters,
  GLASSES: GlassesCharacters,
  RIBBON: RibbonCharacters,
  WIZHAT: WizhatCharacters,
};
export const getAccessoryCharacter = (
  animal: string,
  emotion: string,
  accessory: string
) => {
  const animalName = toPascalCase(animal);
  const emotionName = toPascalCase(emotion);
  const accessoryName = toPascalCase(accessory);
  const componentName = `${animalName}${emotionName}${accessoryName}`;

  let characterModule = (accessoryModules as any)[accessory];

  if (!characterModule) return null;

  return characterModule[componentName];
};
