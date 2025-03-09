const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export const setAccessToken = (value) => {
  return localStorage.setItem(ACCESS_TOKEN, value);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const deleteAccessToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN);
};

export const setRefreshToken = (value) => {
  return localStorage.setItem(REFRESH_TOKEN, value);
};
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const deleteRefreshToken = () => {
  return localStorage.removeItem(REFRESH_TOKEN);
};
