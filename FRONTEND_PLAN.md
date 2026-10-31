# BookNook Frontend Plan (checklist)

Tick each box after the step works and you have committed it.
Rule: minimum **15 notable commits** on the client. One step = one or more small commits.

## Identity
- Name: BookNook. Tagline: "Add a book. Borrow a book. Return a book."
- Theme: Midnight Reading Nook (ink-navy dark glass, amber accent; cream in light mode)
- Fonts: Fraunces (headings), DM Sans (body)

## Pages
| Route | Access | Note |
|---|---|---|
| `/` | Public | Home |
| `/books` | Public | All books + search / filter / sort |
| `/books/[id]` | Private | Details + Borrow |
| `/add-book` | Private | Add form |
| `/my-books` | Private | Edit / Delete |
| `/my-borrows` | Private | Borrow list + Return |
| `/login`, `/register` | Public | Auth |
| `/profile` | Private | My Profile |
| `/about` | Public | Story + FAQ |
| `/contact` | Public | Contact form (toast on success) |
| not-found | n/a | Custom 404 |

## Global layout
**Navbar** (floating glass pill, sticky)
- Left: logo + BookNook. Middle: Home, All Books, Add Book*, My Books*, My Borrows* (* only when logged in).
- Right: theme toggle, then Login/Register buttons (logged out) or avatar dropdown with name, email, My Profile, Logout (logged in).
- Mobile: hamburger with shadcn `Sheet`. Active link gets an amber underline/glow.

**Footer:** logo, one-line about, quick links, contact info, social icons (X, Facebook, GitHub, LinkedIn), copyright.

**Background:** 3 fixed blurred floating orbs on every page.

## Home sections (in order)
1. Hero slider (Swiper), 4 slides, each with title, short text, "Browse Books" button to `/books`
2. Stats strip (books, borrows, readers, categories) with count-up
3. New Arrivals: latest 6 books, newest first, plus "See All Books" button
4. Top Categories: 5 glass tiles linking to `/books?category=...`
5. How Borrowing Works: Add, Borrow, Return
6. Why BookNook: 4 feature cards
7. Reader Reviews: 3 static reviews
8. FAQ accordion: 5 questions
9. CTA banner: "Got books gathering dust? Share them." (Register button if logged out, Add Book if logged in)

## Book card (same everywhere)
Fixed 3:4 cover, category-colored spine strip, title (2-line clamp), author, category badge, copies badge ("3 left" green, "Last copy" amber, "Not Available" red), "View Details" button, hover lift + glow.

## Page details
- **All Books:** search (title/author), category chips, sort (Newest / Oldest / A-Z), 3 columns on desktop, result count, empty state. All client-side.
- **Book Details:** large cover, title, author, category, description, added by + date, copies progress bar, "Borrow This Book" (disabled + "Not Available" at 0 copies), "More in this category".
- **Borrow modal:** name/email read-only, "how many days" select (3/5/7/14) with auto return date, "Confirm Borrow". Double borrow shows an error toast.
- **Add Book:** glass form, Title, Author, Category, Total Copies, Image upload with preview, Description, name/email read-only, loading state, success toast.
- **My Books:** card/table toggle, Edit dialog (prefilled), Delete with AlertDialog, empty state.
- **My Borrows:** table (cards on mobile), Image, Title, Borrow Date, Return Date, due badge ("3 days left" / "Due today" / "Overdue"), Return button, summary line.
- **Profile:** avatar, name, email, joined date, stats (books added, books borrowed, currently borrowing).
- **Login/Register:** centered glass card, live password checklist, eye toggle, Google button, "Forgot Password" as UI only.
- **404:** big glass "404", illustration, "Back to Home".

## Build steps
- [ o] **Step 1:** Cleanup, folder rename, fonts, theme tokens, `next.config.mjs` image domains
- [ ] **Step 2:** Glass utilities, `GlassCard`, `SectionHeading`, `BackgroundOrbs`
- [ ] **Step 3:** Navbar (static, then responsive)
- [ ] **Step 4:** Footer
- [ ] **Step 5:** Theme toggle (`next-themes`)
- [ ] **Step 6:** Hero slider (Swiper)
- [ ] **Step 7:** Static home sections (How it works, Categories, Why, Reviews, FAQ, CTA)
- [ ] **Step 8:** Mock data, `BookCard`, `BookGrid`, New Arrivals
- [ ] **Step 9:** All Books page (search / filter / sort)
- [ ] **Step 10:** Book Details page + Borrow modal (UI only)
- [ ] **Step 11:** Login / Register UI
- [ ] **Step 12:** Add Book form
- [ ] **Step 13:** My Books (edit dialog, delete AlertDialog)
- [ ] **Step 14:** My Borrows
- [ ] **Step 15:** Profile, About, Contact, 404, loading
- [ ] **Step 16:** Framer Motion animation + responsive polish
- [ ] **Later:** Server (Phase 1), connect API, Better Auth, JWT, deploy, README

## Things to prepare later (not needed now)
Google OAuth Client ID/Secret, imgbb API key, two GitHub repos (client + server).