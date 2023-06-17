// api /cgroup1/test2/tar2/api
export const api_production =
  "https://proj.ruppin.ac.il/cgroup1/test2/tar2/api";
export const api_python = "https://moshiko.pythonanywhere.com/";
export const validateEmail = (email) => {
  // regular expression to match email format
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
