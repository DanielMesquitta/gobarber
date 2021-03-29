import { shade } from 'polished';

export default {
  primary: {
    _100: '#FF9000',
    _200: shade(0.2, '#FF9000'),
  },

  gray: {
    _000: '#F4EDE8',
    _100: '#999591',
    _200: '#666360',
    _300: '#312E38',
    _400: '#232129',
  },

  status: {
    error: '#D74B29',
    success: '#00A28F',
    warning: '#FFB900',
  },
};
