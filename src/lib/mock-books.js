// Temporary data. Replaced by the Express and MongoDB API later.
// Each book has the same fields the database will store.

const cover = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

export const mockBooks = [
  {
    _id: "b01",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image: cover("9780735211292"),
    description:
      "A practical guide to building small routines that slowly add up to big changes in how you live and work.",
    totalCopies: 4,
    availableCopies: 3,
    addedBy: { name: "Nusrat Jahan", email: "nusrat@example.com" },
    createdAt: "2026-10-30T09:15:00.000Z",
  },
  {
    _id: "b02",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image: cover("9780062316110"),
    description:
      "A sweeping look at how humans went from a small group of apes to the species that shaped the whole planet.",
    totalCopies: 3,
    availableCopies: 1,
    addedBy: { name: "Tanvir Ahmed", email: "tanvir@example.com" },
    createdAt: "2026-10-29T14:40:00.000Z",
  },
  {
    _id: "b03",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: cover("9780062315007"),
    description:
      "A young shepherd leaves home to chase a dream and learns that the journey matters as much as the treasure.",
    totalCopies: 5,
    availableCopies: 5,
    addedBy: { name: "Sadia Rahman", email: "sadia@example.com" },
    createdAt: "2026-10-28T11:05:00.000Z",
  },
  {
    _id: "b04",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: cover("9780553380163"),
    description:
      "From black holes to the birth of the universe, explained for readers who are curious but not physicists.",
    totalCopies: 2,
    availableCopies: 0,
    addedBy: { name: "Nusrat Jahan", email: "nusrat@example.com" },
    createdAt: "2026-10-27T16:20:00.000Z",
  },
  {
    _id: "b05",
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    category: "Kids",
    image: cover("9780399208539"),
    description:
      "A tiny caterpillar eats its way through a week of snacks and turns into something beautiful. Perfect for bedtime.",
    totalCopies: 3,
    availableCopies: 2,
    addedBy: { name: "Sadia Rahman", email: "sadia@example.com" },
    createdAt: "2026-10-26T08:30:00.000Z",
  },
  {
    _id: "b06",
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    image: cover("9780451524935"),
    description:
      "A chilling story of a world where every move is watched and the truth is whatever the government says it is.",
    totalCopies: 3,
    availableCopies: 2,
    addedBy: { name: "Tanvir Ahmed", email: "tanvir@example.com" },
    createdAt: "2026-10-25T19:10:00.000Z",
  },
  {
    _id: "b07",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    image: cover("9780345539434"),
    description:
      "A warm and wonder-filled tour of the universe that makes the night sky feel like home.",
    totalCopies: 2,
    availableCopies: 2,
    addedBy: { name: "Nusrat Jahan", email: "nusrat@example.com" },
    createdAt: "2026-10-24T10:00:00.000Z",
  },
  {
    _id: "b08",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "History",
    image: cover("9780553296983"),
    description:
      "The real diary of a teenager hiding during the war, written with honesty, humor and hope.",
    totalCopies: 2,
    availableCopies: 1,
    addedBy: { name: "Sadia Rahman", email: "sadia@example.com" },
    createdAt: "2026-10-23T13:45:00.000Z",
  },
  {
    _id: "b09",
    title: "Charlotte's Web",
    author: "E. B. White",
    category: "Kids",
    image: cover("9780064400558"),
    description:
      "A clever spider and a worried pig prove that true friends can change your whole story.",
    totalCopies: 3,
    availableCopies: 3,
    addedBy: { name: "Tanvir Ahmed", email: "tanvir@example.com" },
    createdAt: "2026-10-22T09:25:00.000Z",
  },
  {
    _id: "b10",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    image: cover("9780061120084"),
    description:
      "Seen through a child's eyes, a small town faces a hard question about justice and courage.",
    totalCopies: 4,
    availableCopies: 4,
    addedBy: { name: "Nusrat Jahan", email: "nusrat@example.com" },
    createdAt: "2026-10-21T17:55:00.000Z",
  },
  {
    _id: "b11",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    image: cover("9780198788607"),
    description:
      "A bold way of looking at evolution, where genes are the ones playing the long game.",
    totalCopies: 2,
    availableCopies: 1,
    addedBy: { name: "Tanvir Ahmed", email: "tanvir@example.com" },
    createdAt: "2026-10-20T12:30:00.000Z",
  },
  {
    _id: "b12",
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    image: cover("9780393317558"),
    description:
      "Why did some societies grow powerful while others did not? A big-picture answer built on geography and chance.",
    totalCopies: 2,
    availableCopies: 2,
    addedBy: { name: "Sadia Rahman", email: "sadia@example.com" },
    createdAt: "2026-10-19T15:15:00.000Z",
  },
  {
    _id: "b13",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    image: cover("9780141439518"),
    description:
      "Sharp wit, family drama and a slow-burning romance between two people who are both a little too proud.",
    totalCopies: 3,
    availableCopies: 2,
    addedBy: { name: "Nusrat Jahan", email: "nusrat@example.com" },
    createdAt: "2026-10-18T08:05:00.000Z",
  },
  {
    _id: "b14",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    category: "Kids",
    image: cover("9780064431781"),
    description:
      "A boy sails to an island of wild creatures, becomes their king and then remembers where home is.",
    totalCopies: 2,
    availableCopies: 0,
    addedBy: { name: "Sadia Rahman", email: "sadia@example.com" },
    createdAt: "2026-10-17T18:20:00.000Z",
  },
  {
    _id: "b15",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image: cover("9780743273565"),
    description:
      "Parties, money and a mysterious millionaire in the Jazz Age, with a heartbreak hiding underneath the glitter.",
    totalCopies: 3,
    availableCopies: 3,
    addedBy: { name: "Tanvir Ahmed", email: "tanvir@example.com" },
    createdAt: "2026-10-16T11:35:00.000Z",
  },
];

// Newest first. The real API will do this with sort and limit in MongoDB.
export function getLatestBooks(count) {
  return [...mockBooks]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, count);
}

// Temporary numbers for the stats strip.
export const mockStats = {
  books: mockBooks.length,
  borrows: 38,
  readers: 24,
  categories: 5,
};