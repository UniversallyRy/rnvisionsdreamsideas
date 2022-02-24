import { Dimensions } from "react-native";

export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const VISIBILITY_FILTERS: object = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
};

export const THUMBNAIL_SIZE = 80;

export const SPACING = 10;

export const MONTHS = [
  'All',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];


