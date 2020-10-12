export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";
  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";
  return "";
};
