let accessToken = "";

export const getAccessToken = () => {
  return accessToken;
};
export const setAccessToken = (s) => {
  if ((typeof s === "string" && !(s === "")) || s === null) {
    accessToken = s;
    return true;
  } else {
    return false;
  }
};

export default accessToken;
