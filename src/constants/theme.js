import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;
const contentWidth = width - 15 * 2; // 15 => global padding
const halfContentWidth = (width - 15 * 2 - 15) / 2;
const colors = {
  black: '#000000',
  white: '#ffffff',
  // background color for all screens
  yellow: '#f5f3ef',
  // background color of login button
  pink: '#d9b0f2',
  grey: '#41464c',
  lightGrey: '#d3d3d3d3',
};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 10,
  padding: 15,
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  contentWidth: contentWidth,
  halfContentWidth: halfContentWidth,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  smallFontSize: 14,
  middleFontSize: 16,
  normalFontSize: 18,
  largeFontSize: 24,
  xlargeFontSize: 28,
  xxlargeFontSize: 40,

  // padding
  xsmallPadding: 4,
  smallPadding: 8,
  normalPadding: 10,
  largePadding: 20,
  xlargepadding: 40,

  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
};

const PATH = '../assets/images/';
const images = {
  LOGO: require(`${PATH}logo.png`),
  BACK: require(`${PATH}back_arrow.png`),
  UP: require(`${PATH}up_arrow.png`),
  DOWN: require(`${PATH}down_arrow.png`),

  // profile
  // How do you like cut of the tops?
  LOOSE: require(`${PATH}/profile/loose.jpg`),
  CLASSIC: require(`${PATH}/profile/classic.jpg`),
  CREW_NECK: require(`${PATH}/profile/crew_neck.jpg`),
  OVERSIZED: require(`${PATH}/profile/oversized.jpg`),
  TIGHT: require(`${PATH}/profile/tight.jpg`),
  V_NECK: require(`${PATH}/profile/v_neck.jpg`),
  CROPPED: require(`${PATH}/profile/cropped.jpg`),
  LONG: require(`${PATH}/profile/long.jpg`),

  // How do you like the cut of your dresses & skirts?
  LOOSE_DRESSES: require(`${PATH}/profile/loose_dresses.jpg`),
  HIGH_WAIST: require(`${PATH}/profile/high_waist.jpg`),
  LONG_DRESS: require(`${PATH}/profile/long_dress.jpg`),
  CLASSIC_LENGTH: require(`${PATH}/profile/classic_length.jpg`),
  TIGHT_DRESSES: require(`${PATH}/profile/tight_dresses.jpg`),
  SHORT_DRESS: require(`${PATH}/profile/short_dresses.png`),

  // Which ones are your favourite jumpers & knitted pullover?
  TURTLE_NECK: require(`${PATH}/profile/turtle_necks.png`),
  JUMPERS: require(`${PATH}/profile/jumpers.png`),
  CARDIGANS: require(`${PATH}/profile/cardigans.png`),
  LONE_LINES: require(`${PATH}/profile/long_lines.png`),

  // What are yoru NO-GO in print and Patterns?
  LACE: require(`${PATH}/profile/lace.jpg`),
  POLKA_DOTS: require(`${PATH}/profile/polka_dots.jpg`),
  ANIMAL_PRINTS: require(`${PATH}/profile/animal_prints.jpg`),
  STRIPES: require(`${PATH}/profile/stripes.jpg`),
  RETRO: require(`${PATH}/profile/retro.jpg`),
  FLOWERS: require(`${PATH}/profile/knitwear.jpg`),
  GEOMETRIC: require(`${PATH}/profile/geometric.jpg`),
  CHECKED: require(`${PATH}/profile/checked_prints.jpg`),

  // Swipe Screen
  CROSS: require(`${PATH}/swipe/cross.png`),
  RESET: require(`${PATH}/swipe/reset.png`),
  SHAPES: require(`${PATH}/swipe/shapes.png`),
};

export {colors, sizes, fonts, images};
