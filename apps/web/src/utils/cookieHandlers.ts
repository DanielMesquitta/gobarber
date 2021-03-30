import cookie from 'js-cookie';

const prefix = '@GoBarber';

const setCookie = (name: string, data: string) => {
  cookie.set(`${prefix}:${name}`, data);
};

const removeCookie = (name: string) => {
  cookie.remove(`${prefix}:${name}`);
};

const getCookie = (name: string) => {
  const cookieData = cookie.get(`${prefix}:${name}`);
  return cookieData;
};

export { setCookie, removeCookie, getCookie };
