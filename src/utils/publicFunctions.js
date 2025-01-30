export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  return regex.test(password);
};

export const handleLogout = (setName) => {
  setName(null);
  sessionStorage.removeItem('userData');
};
