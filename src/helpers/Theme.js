import { darken, lighten } from 'polished'
const colors = require('./colors.json')

const accent = 0.2
const generateColor = (color) => ({
  base: color,
  light: lighten(accent, color),
  dark: darken(accent, color),
})
const generateBackground = (color) => ({
  level0: color,
  level1: lighten(0.015, color),
  level2: lighten(0.03, color),
  level3: lighten(0.045, color),
})

export default {
  margin: 20,
  padding: 20,

  // Base box or text shadow length.
  shadowLength: 4,

  // Base animation duration in ms.
  animTime: 600,

  // The opacity to apply to elements when needed.
  alpha: 0.65,

  // The color variation.
  accent,

  // Every color has a `base`, `light` and `dark` variation.
  color: {
    primary: generateColor(colors.grassGreen),
    secondary: generateColor(colors.jade),
    header: generateColor(colors.malachite),
    control: generateColor(colors.malachite),
    success: generateColor(colors.lime),
    alert: generateColor(colors.red),
    disabled: generateColor(colors.granite),
  },

  // Every background color has level colors from 0 until 3
  // as `level0`, `level1`...
  background: {
    primary: generateBackground(colors.black),
    secondary: generateBackground(colors.acadia),
    header: generateBackground(colors.blackPearl),
    control: generateBackground(colors.black),
    success: generateBackground(colors.blackForest),
    alert: generateBackground(colors.diesel),
    disabled: generateBackground(colors.darkRed),
  },

  typography: {
    lineHeight: 1.5,
    headerSizes: {
      h1: 28,
      h2: 24,
      h3: 21,
      h4: 18,
      h5: 16,
      h6: 16,
    },
    fontSize: 21,
    headerFontFamily: '"Orbitron", "sans-serif"',
    fontFamily: '"Orbitron", "sans-serif"',
  },

  code: {
    fontSize: 14,
    fontFamily:
      'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace',
    background: colors.black,
    color: colors.butterflyBlue,
    comment: colors.blueBayoux,
    keyword: colors.wisteria,
    operator: colors.brandeisBlue,
    function: colors.mediumPurple,
    variable: colors.butterflyBlue,
    selector: colors.butterflyBlue,
    value: colors.caribbeanGreen,
  },

  // Number of columns inside a row
  columns: 12,

  // Until the number in device screen width the breakpoint is taken.
  // E.g. Until the `small` number is viewport small, from `small + 1` is medium.
  // After `large` one it is `xlarge`.
  responsive: {
    small: 600,
    medium: 992,
    large: 1200,
  },
}
