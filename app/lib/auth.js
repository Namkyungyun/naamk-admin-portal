export const getAccessToken = () => sessionStorage.getItem("accessToken");
export const setAccessToken = (token) => sessionStorage.setItem("accessToken", token);
export const removeAccessToken = () => sessionStorage.removeItem("accessToken");
