# BookNook

**Add a book. Borrow a book. Return a book.**

BookNook is a small online library where readers share books from their own shelf, borrow books from other readers for a few days, and return them with one click. It has a dark "Midnight Reading Nook" glass design, a warm cream light mode, and a real full stack system behind it.

**Live site:** https://booknook-client-chi.vercel.app/

**Server repo:** https://github.com/Shakir4Mahmud/booknook-server

---

## Features

- **Real authentication** with Better Auth and the MongoDB adapter. Register with email and password (you are logged in right away) or continue with Google.
- **Stays logged in on reload.** Reloading any private route keeps your session and does not send you to Login.
- **Smart redirects.** Open a private page or click Borrow while logged out and you go to Login, then come straight back to the page you wanted.
- **Add, edit and delete books** with cover upload (imgbb), category, description and total copies. Only the person who added a book can edit or delete it.
- **Borrow system** with a 3, 5, 7 or 14 day option and an automatic return date. You cannot borrow your own book, and you cannot borrow the same book twice at the same time.
- **Live copy count.** Borrowing lowers the available copies in the database and returning raises them again. Everyone sees the same number. At 0 copies the button turns into "Not Available".
- **My Borrows** page with due badges (days left, due today, overdue) and a Return Book button.
- **Search, filter and sort** on All Books (by title or author, by category, newest, oldest or A to Z).
- **Modern iOS style glass UI** with dark and light theme, a floating navbar, a mobile drawer and smooth Framer Motion animation.
- **Fully responsive** on mobile, tablet and desktop, with a custom 404 page, loading spinners and dynamic page titles.
- **No default alerts.** Every message is a toast (sonner) and every confirmation is a custom modal.

## Pages

| Route | Access | What it does |
|---|---|---|
| `/` | Public | Hero slider, new arrivals, categories, how it works, reviews, FAQ |
| `/books` | Public | All books with search, category filter and sort |
| `/books/[id]` | Private | Book details and the Borrow button |
| `/add-book` | Private | Add a new book |
| `/my-books` | Private | Edit or delete the books you added |
| `/my-borrows` | Private | Books you borrowed and the Return button |
| `/profile` | Private | Your profile and photo upload |
| `/login`, `/register` | Public | Email and password or Google |
| `/about`, `/contact` | Public | Story, FAQ and contact form |

## Tech Stack

**Client**
- Next.js (App Router) and React
- JavaScript
- Tailwind CSS and shadcn/ui
- Better Auth with the MongoDB adapter and the JWT plugin
- Framer Motion, Swiper, next-themes, sonner, lucide-react
- imgbb for image upload

**Server**
- Node.js and Express
- MongoDB (native driver)
- JWT check with `jose` using the public keys from Better Auth

## How the login token works

1. The user logs in on the Next.js app with Better Auth.
2. The client asks Better Auth for a JWT and sends it to the Express server as `Authorization: Bearer <token>`.
3. The server checks the token against the public keys at `/api/auth/jwks`.
4. The server takes the user's email from the token, so the owner of a book or a borrow is never taken from the request body.

## API (Express server)

| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | `/books` | Public | All books, newest first (`?limit=6` for new arrivals) |
| GET | `/books/:id` | Public | One book |
| POST | `/books` | Token | Add a book |
| PATCH | `/books/:id` | Token, owner only | Update a book |
| DELETE | `/books/:id` | Token, owner only | Delete a book and its borrow records |
| POST | `/borrows` | Token | Borrow a book |
| GET | `/borrows` | Token | Borrows of the logged in user |
| DELETE | `/borrows/:id` | Token, borrower only | Return a book |



## Author

Made by **Shakir Mahmud** as a full stack assignment project.

- GitHub: [@Shakir4Mahmud](https://github.com/Shakir4Mahmud)