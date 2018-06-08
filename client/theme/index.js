import { lighten } from 'polished';
import colors from './colors';

const success = {
  backgroundColor: lighten(0.3, 'green'),
  color: colors.quinary,
};

const error = {
  backgroundColor: lighten(0.3, colors.septenary),
  color: colors.septenary,
};

const buttonOne = {
  color: 'black',
  backgroundColor: lighten(0.1, colors.primary),
};

const main = {
  colors,
  success,
  error,
  buttonOne,
};

export default main;
