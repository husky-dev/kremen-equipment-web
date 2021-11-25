import color from 'color';
import { ColorsSet } from 'styles';

const colorsCache: Record<string, ColorsSet> = {};

export const colorSetFromColor = (val: string): ColorsSet => {
  if (colorsCache[val]) {
    return colorsCache[val];
  }
  colorsCache[val] = {
    light: val,
    dark: color(val).darken(0.5).toString(),
  };
  return colorsCache[val];
};
