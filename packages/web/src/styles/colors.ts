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
    error: {
      _100: '#FDDEDE',
      _200: '#C53030',
    },
    success: {
      _100: '#E6FFFA',
      _200: '#2E656A',
    },
    warning: {
      _100: '#FFB900',
      _200: '#FFB900',
    },
    info: {
      _100: '#EBF8FF',
      _200: '#3172B7',
    },
  },
};
