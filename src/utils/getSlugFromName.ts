export const getSlugFromName = (name: string) => {
  const slug = name.trim().toLowerCase().replace(" ", "-");
  return slug;
};
