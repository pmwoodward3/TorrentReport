import { lighten } from 'polished';
import colors from './colors';

const notifications = {
  success: {
    backgroundColor: lighten(0.3, 'green'),
    color: colors.quinary,
  },
  error: {
    backgroundColor: lighten(0.3, colors.septenary),
    color: colors.septenary,
  },
};

export default notifications;
