// import { Dimensions, Platform } from "react-native";

// const SCREEN_HEIGHT = 736;
// const SCREEN_WIDTH = 414;

// const { height=0, width=0 } = Dimensions?.get("window") || {};

// export default function(units = 1) {
//   return (width / SCREEN_WIDTH) * units;
// }

// const scale = (size) => (height / SCREEN_HEIGHT) * size;

// export { scale };


import { Dimensions, Platform } from "react-native";

const SCREEN_HEIGHT = 736;
const SCREEN_WIDTH = 414;

const { height, width } = Dimensions.get("window");

export function scale(scaleValue = 1) {
  let scaleFactor = 1;

  if (Platform.OS === 'ios') {
    scaleFactor = width / SCREEN_WIDTH;
  } else if (Platform.OS === 'android') {
    scaleFactor = height / SCREEN_HEIGHT;
  }

  return scaleFactor * scaleValue;
}