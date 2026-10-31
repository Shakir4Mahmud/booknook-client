// Date helper. Server and browser must print the same text, so mock dates use UTC.
// Pass useLocal = true for dates made in the browser (like a borrow date).
export function formatDate(value, useLocal = false) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: useLocal ? undefined : "UTC",
  });
}