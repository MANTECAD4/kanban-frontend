export const getNameAbreviation = (fullName: string) => {
  if (!fullName) return "";
  const [firstName, lastName] = fullName.split(" ");
  if (firstName && lastName) {
    return firstName.charAt(0).concat(lastName.charAt(0));
  }
  return firstName.substring(0, 2);
};
