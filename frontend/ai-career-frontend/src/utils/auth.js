// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const isLoggedIn = () => {
//   return !!localStorage.getItem("token");
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.href = "/";
// };



// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const setToken = (token) => {
//   localStorage.setItem("token", token);
// };

// export const logout = () => {
//   localStorage.removeItem("token");
// };




export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // window.location.replace("/login");
};