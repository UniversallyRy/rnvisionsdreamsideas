import { Easing } from "react-native-reanimated";
import { windowWidth } from "../utils/constants";

export const MARGIN = 8;
export const SIZE = windowWidth / 2 - MARGIN;
export const COL = 2;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number): { x: number; y: number; } => {
  "worklet";

  return {
    x: position % COL === 0 ? 0 : SIZE,
    y: Math.floor(position / COL) * SIZE,
  };
};

export const getOrder = ({ tx, ty, max }: { tx: number; ty: number; max: number; }): number => {
  "worklet";

  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};
