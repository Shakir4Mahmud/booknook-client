// One place for category colors. Used by book cards, badges and filters.
export const categoryColors = {
  Fiction: "#e0607e",
  Science: "#1fb5b0",
  History: "#f6b756",
  Kids: "#4cb6f5",
  Others: "#8b7cf6",
};

export const categoryList = Object.keys(categoryColors);

export function getCategoryColor(category) {
  return categoryColors[category] || categoryColors.Others;
}