export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //this validates email format crazyy
  return regex.test(email);
};

