# 🏠 TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED — Complete Real Estate Web App

A fully functional, production-ready React + Vite real estate portal.
No backend required — everything runs in the browser via localStorage.

---

## ▶️ Quick Start

```bash
unzip homequest-full.zip
cd homequest2
npm install
npm run dev
# → http://localhost:5173
```

---

## 🗂️ All Pages

| Page             | Route          | Description                                        |
|------------------|----------------|----------------------------------------------------|
| **Home**         | `/`            | Hero, categories, properties, blogs, stats         |
| **Search**       | `/search`      | Filters (type/BHK/price/city/status), sort, grid/list |
| **Property**     | `/property/:id`| Gallery, tabs, EMI calculator, contact modal       |
| **Login/Register**| `/login`      | Auth with localStorage, demo account               |
| **Post Property**| `/post`        | 4-step wizard, saves listing locally               |
| **Wishlist**     | `/wishlist`    | Saved properties (login-gated)                     |
| **Profile**      | `/profile`     | Edit profile, view listings & wishlist             |
| **About Us**     | `/about`       | Team, mission, values, awards                      |
| **Blog**         | `/blog`        | Articles with search & category filter             |
| **Blog Detail**  | `/blog/:id`    | Full article with sidebar & related posts          |
| **Contact**      | `/contact`     | Contact form, offices, FAQ accordion               |

---

## ✏️ HOW TO EDIT CONTENT (Everything in ONE file)

**`src/data/content.js`** is your single source of truth.
Edit it and every page updates automatically.

### Change site name, phone, email, address:
```js
export const SITE = {
  name:    "TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED",          // ← change site name
  phone:   "+91 98765 43210",    // ← change phone
  email:   "hello@homequest.in", // ← change email
  address: "12th Floor, ...",    // ← change address
};
```

### Change hero banner image:
```js
export const HERO = {
  image: "https://images.unsplash.com/photo-XXXXX", // ← paste any image URL
  // OR use a local file: "/images/my-hero.jpg"  (put file in /public/images/)
  heading: "Find Your Dream Home\nIn India's Best Cities",
  subtext: "Explore 3,17,000+ verified properties.",
};
```

### Add / edit a property listing:
```js
export const PROPERTIES = [
  {
    id: 9,                                      // ← unique number
    img: "https://your-image-url.com/pic.jpg", // ← card thumbnail
    images: ["url1", "url2", "url3"],          // ← detail page gallery
    status: "ONGOING",   // ONGOING or COMPLETED
    type: "Apartment",   // Apartment | Villa | Plot
    listingType: "Buy",  // Buy | Rent
    price: "₹85 Lakhs",
    name: "My Project",
    loc: "Noida, Delhi NCR",
    // ... rest of fields
  },
];
```

### Add / edit a blog post:
```js
export const BLOGS = [
  {
    id: 7,
    img: "https://your-blog-image.jpg",  // ← blog cover image
    title: "My New Article",
    excerpt: "Short preview shown on the listing page...",
    body: `Full article text here. Use **bold** for headings.
    
Use blank lines between paragraphs.

1. Numbered lists work
2. Like this

- Bullet points too
- Like this`,
    date: "August 2025",
    author: "Author Name",
    authorImg: "https://photo-url.jpg",  // ← author photo
    category: "Buying Guide",
    readTime: "5 min read",
    tags: ["Tag1", "Tag2"],
  },
];
```

### Change team members (About page):
```js
export const ABOUT = {
  team: [
    {
      name: "Your Name",
      role: "CEO",
      bio:  "Your bio here.",
      img:  "https://your-photo.jpg",  // ← team member photo
      linkedin: "https://linkedin.com/in/yourprofile",
    },
  ],
};
```

### Change brand colors:
```js
export const COLORS = {
  teal:      "#00b8a2",  // ← primary accent
  tealDark:  "#008c7a",  // ← hover state
  navy:      "#1a2340",  // ← navbar/footer
  orange:    "#ff6b35",  // ← badges
  gold:      "#f0a500",  // ← luxury/stars
};
```

### Using local images instead of URLs:
1. Put your image in `/public/images/` → e.g. `/public/images/property1.jpg`
2. In `content.js` use: `img: "/images/property1.jpg"`

---

## 🔐 Auth System (No Backend)

All auth runs in `localStorage` — no server needed.

| Action    | What happens                                               |
|-----------|------------------------------------------------------------|
| Register  | Saves `{name, email, phone, hashedPassword}` to localStorage |
| Login     | Validates against stored credentials                       |
| Session   | Persists across page refreshes automatically               |
| Wishlist  | Saved per user in localStorage                             |
| Listings  | Posted properties saved under user's ID                    |
| Logout    | Clears session, wishlist unloaded from state               |

**Demo account** — click "🚀 Try Demo Account" on the login page.

---

## 🗂 Project Structure

```
src/
├── data/
│   └── content.js         ← ✏️  EDIT ALL CONTENT HERE
├── utils/
│   └── storage.js         ← localStorage auth + data engine
├── context/
│   └── AppContext.jsx      ← global state (user, wishlist, city, toasts)
├── styles/
│   └── global.css         ← CSS variables, animations, reset
├── components/
│   ├── Navbar/            ← sticky nav with search, city, user menu
│   ├── PropertyCard/      ← reusable card with wishlist & hover
│   ├── Footer/            ← full multi-column footer with router links
│   └── Notifications/     ← auto-dismiss toast system
└── pages/
    ├── Home/              ← homepage
    ├── Search/            ← search + filter + sort
    ├── PropertyDetail/    ← gallery + EMI calc + contact modal
    ├── Login/             ← login + register
    ├── Wishlist/          ← saved properties
    ├── PostProperty/      ← 4-step listing wizard
    ├── Profile/           ← profile + my listings
    ├── About/             ← about us
    ├── Blog/              ← blog list + blog detail
    └── Contact/           ← contact form + FAQ
```

---

## 📦 Dependencies

```json
"react": "^18",
"react-dom": "^18",
"react-router-dom": "^6",
"vite": "^5",
"@vitejs/plugin-react": "^4"
```

Zero UI libraries. Zero CSS frameworks. Pure React + CSS variables.

---

## 🔌 Connecting a Real Backend Later

Replace `src/utils/storage.js` functions with API calls:

```js
// Register
const res = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, phone, password }),
});

// Login
const res = await fetch("/api/auth/login", { ... });
const { token, user } = await res.json();
localStorage.setItem("token", token); // store JWT
```

Replace static `PROPERTIES` array with:
```js
const [properties, setProperties] = useState([]);
useEffect(() => {
  fetch("/api/properties").then(r => r.json()).then(setProperties);
}, []);
```
