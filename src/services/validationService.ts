export const validationService = () => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) return false;
    if (!/\d/.test(password)) return false;
    return true;
  };

  const isUsernameTaken = (username: string): boolean => {
    const takenUsernames = ['admin', 'root', 'user123'];
    return takenUsernames.includes(username.toLowerCase());
  };

  return {
    validateEmail,
    validatePassword,
    isUsernameTaken,
  };
};
