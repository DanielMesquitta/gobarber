import cookie from 'js-cookie';

const prefix = '@GoBarber';

const setCookie = (name: string, data: string | { [key: string]: any }) => {
  cookie.set(`${prefix}:${name}`, data, { expires: 1 });
};

const removeCookie = (name: string) => {
  cookie.remove(`${prefix}:${name}`);
};

const getCookie = <T>(name: string) => {
  const cookieData = JSON.parse(cookie.get(`${prefix}:${name}`)) as T;
  return cookieData;
};

export { setCookie, removeCookie, getCookie };
