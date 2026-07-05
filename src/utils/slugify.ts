export const slugify = (text: string) => {
  return (
    text
      .toString() // Ensure input is a string
      .normalize("NFKD") // Separate accent marks from letters
      .replace(/[\u0300-\u036f]/g, "") // Remove the accent marks
      .toLowerCase() // Convert text to lowercase
      .trim() // Clean up whitespace from both ends
      // .replace(/[^a-z0-9 -]/g, '')          // Delete all non-alphanumeric chars (except spaces/hyphens)
      .replace(/\s+/g, "-") // Turn spaces into single hyphens
      .replace(/-+/g, "-") // Flatten multiple consecutive hyphens
      .replace(/^-+|-+$/g, "")
  ); // Trim hyphens from the start and end
};
