const cleanTitle = (title: string): string =>
  title
    .replace(/[-/\\[\]]/g, " ") // Replace specific characters with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert the text to lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalise the first letter of each word

export default cleanTitle;
