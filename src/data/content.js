// ============================================================
//  TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED — MASTER CONTENT CONFIG
//  Edit ANYTHING here: text, images, colors, contact info.
//  No need to touch individual page files.
// ============================================================

// ── SITE IDENTITY ─────────────────────────────────────────────────────────────
export const SITE = {
  name:       "TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED",
  tagline:    "Find Your Perfect Property",
  description:"High-Impact Infrastructure & Real Estate Development Company",
  logo:       "<img src='/logo.png' alt='Touch to Infinity'>",                         // emoji OR swap with an <img> src
  phone:      "98107 76604",
  email:      "t2infinity25@gmail.com",
  address:    "New Delhi, India",
  mapEmbed:   "https://maps.google.com",    // replace with real embed URL
  social: {
    facebook:  "https://facebook.com",
    twitter:   "https://twitter.com",
    youtube:   "https://youtube.com",
    instagram: "https://instagram.com",
    linkedin:  "https://linkedin.com",
  },
};

// ── BRAND COLORS ─────────────────────────────────────────────────────────────
// These are injected into global.css at runtime via CSS variables.
// Just change a hex here to retheme the entire site.
export const COLORS = {
  blue:        "#1565C0",   // primary
  blueDark:    "#0D47A1",   // hover / dark
  blueLight:   "#E3F2FD",   // backgrounds
  blueBright:  "#2196F3",   // CTAs / badges
  navy:        "#0D1B3E",   // navbar / footer
  navyLight:   "#152354",
  orange:      "#FF6D00",   // accent badges
  gold:        "#FFA000",   // luxury / stars
};

// ── HERO BANNER (Home page) ───────────────────────────────────────────────────
export const HERO = {
  // Replace with your own image URL or a local path like "/images/hero.jpg"
  image:    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80",
  heading:  "Find Your Dream Home\nIn India's Best Cities",
  subtext:  "Explore 3,17,000+ verified properties. Trusted by millions.",
  cta1:     "Explore Properties",
  cta2:     "Post Free Listing",
};

// ── STATS (Home page) ─────────────────────────────────────────────────────────
export const STATS = [
  { icon: "🏘️", number: "3,17,077+", label: "Properties & Counting", sub: null },
  { icon: "📋", number: "3,723",     label: "Properties Listed",      sub: "In the last 24 Hours" },
  { icon: "🤝", number: "5,474",     label: "Sellers Contacted",      sub: "In the last 24 Hours" },
];

// ── PROPERTY CATEGORIES (Home page cards) ─────────────────────────────────────
export const CATEGORIES = [
  { icon: "🏢", title: "Buy property in Dubai", type: "Buy property in Dubai", listing: "Buy",  prices: ["Below ₹60L", "₹60L–₹80L", "₹80L–₹1Cr"] },
  { icon: "🏡", title: "Buy property in Delhi NCR",type: "Buy property in Delhi NCR",     listing: "Buy",  prices: ["₹60L–₹80L", "₹80L–₹1Cr", "₹1Cr–₹5Cr"] },
  // { icon: "🏰", title: "Luxury Homes",   type: "Luxury Homes", listing: "Buy",  luxury: true, prices: ["₹1Cr–₹1.6Cr", "₹1.6Cr–₹5Cr", "Above ₹5Cr"] },
  // { icon: "🌳", title: "Buy Plots",      type: "Buy Plots",      listing: "Buy",  prices: ["Below ₹60L", "₹60L–₹80L", "Above ₹80L"] },
  // { icon: "🔑", title: "Rent Flats",     type: "Rent Flats", listing: "Rent", prices: ["1 BHK", "2 BHK", "3 BHK"] },
];

// ── LOCALITIES (Home page chips) ─────────────────────────────────────────────
export const LOCALITIES = [
  // { name: "Uttam Nagar", count: "20+ for Sale", city: "Delhi" },
  // { name: "Chhatarpur",  count: "10+ for Sale", city: "Delhi" },
  // { name: "L Zone",      count: "10+ for Sale", city: "Delhi" },
  // { name: "Shadipur",    count: "8+ for Sale",  city: "Delhi" },
  // { name: "Okhla",       count: "15+ for Sale", city: "Delhi" },
  // { name: "Dwarka",      count: "30+ for Sale", city: "Delhi" },
];

// ── APP PROMO (Home page banner) ──────────────────────────────────────────────
// (APP_PROMO removed)

// ── COMMUNITY SECTION (Home page) ────────────────────────────────────────────
export const COMMUNITY = [
  {
    icon:  "🏗️",
    title: "TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED Forum",
    desc:  "A platform that brings together residents, owners and tenants in one place. Get answers about your project.",
    btn:   "VISIT FORUM",
    href:  "#",
  },
  {
    icon:  "👥",
    title: "TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED Groups",
    desc:  "Connect with your Neighbours. A platform that brings all residents together to build a happy community.",
    btn:   "JOIN GROUP",
    href:  "#",
  },
];

// ── PROPERTIES DATA ───────────────────────────────────────────────────────────
// Add/edit/remove property objects here.
// img & images: use Unsplash URLs or replace with "/images/property1.jpg"
export const PROPERTIES = [
  {
    id: 1,
    img:    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    status:      "ONGOING",
    type:        "Apartment",
    listingType: "Buy",
    priceMin:    8700000,
    priceMax:    21400000,
    price:       "₹87 Lakhs – 2.14 Crores",
    name:        "Rohan Saroha",
    locality:    "Bhugaon",
    city:        "Pune",
    loc:         "Bhugaon, Pune",
    config:      "2, 3, 4 BHK Apartment",
    bhk:         [2, 3, 4],
    area:        "1250 – 2800 sq.ft",
    builder:     "Rohan Builders & Developers",
    possession:  "Dec 2025",
    rera:        "P52100027475",
    amenities:   ["Swimming Pool","Gym","Clubhouse","Children's Play Area","24/7 Security","Power Backup","Parking","Garden"],
    description: "Rohan Saroha is a premium residential project offering spacious 2, 3 and 4 BHK apartments in the serene locality of Bhugaon, Pune. The project features world-class amenities and lush green surroundings.",
    rating: 4.5, reviews: 128, featured: true,  new: false,
  },
  {
    id: 2,
    img:    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    ],
    status:      "ONGOING",
    type:        "Apartment",
    listingType: "Buy",
    priceMin:    3800000,
    priceMax:    7000000,
    price:       "₹38 Lakhs – 70 Lakhs",
    name:        "Fortune Heights",
    locality:    "Barasat",
    city:        "Kolkata",
    loc:         "Barasat, Kolkata",
    config:      "2, 2.5, 3 BHK Apartment",
    bhk:         [2, 3],
    area:        "850 – 1450 sq.ft",
    builder:     "Fortune Realty",
    possession:  "Mar 2026",
    rera:        "HIRA/P/KOL/2022/000187",
    amenities:   ["Gym","Clubhouse","Children's Play Area","24/7 Security","Power Backup","Parking"],
    description: "Fortune Heights offers thoughtfully designed 2 and 3 BHK apartments in Barasat, Kolkata's growing residential corridor.",
    rating: 4.2, reviews: 84, featured: false, new: true,
  },
  {
    id: 3,
    img:    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    ],
    status:      "COMPLETED",
    type:        "Plot",
    listingType: "Buy",
    priceMin:    4749000,
    priceMax:    127500000,
    price:       "₹47.49 Lakhs – 12.75 Crores",
    name:        "G Square Alchemy",
    locality:    "Rajarajeshwari Nagar",
    city:        "Mysore",
    loc:         "Rajarajeshwari Nagar, Mysore",
    config:      "Plot",
    bhk:         [],
    area:        "600 – 4800 sq.ft",
    builder:     "G Square Housing",
    possession:  "Ready to Move",
    rera:        "PRM/KA/RERA/1251/309/PR/180718/001729",
    amenities:   ["Gated Community","24/7 Security","Paved Roads","Street Lights","Water Supply","Drainage"],
    description: "G Square Alchemy offers premium plotted development in Rajarajeshwari Nagar, Mysore.",
    rating: 4.7, reviews: 203, featured: true,  new: false,
  },
  {
    id: 4,
    img:    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    status:      "ONGOING",
    type:        "Apartment",
    listingType: "Buy",
    priceMin:    95200000,
    priceMax:    118700000,
    price:       "₹9.52 Cr – 11.87 Cr",
    name:        "TARC Tripundra",
    locality:    "Bijwasan",
    city:        "Delhi",
    loc:         "Bijwasan, Delhi",
    config:      "3BHK, 4BHK Apartment",
    bhk:         [3, 4],
    area:        "2800 – 4200 sq.ft",
    builder:     "TARC Limited",
    possession:  "Jun 2027",
    rera:        "DLRERA2022P0006",
    amenities:   ["Swimming Pool","Gym","Spa","Clubhouse","Tennis Court","Concierge","Smart Home","Parking","24/7 Security"],
    description: "TARC Tripundra is a luxury residential project in Bijwasan, Delhi offering ultra-premium 3 and 4 BHK apartments.",
    rating: 4.8, reviews: 56, featured: true,  new: false,
  },
  {
    id: 5,
    img:    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    ],
    status:      "ONGOING",
    type:        "Apartment",
    listingType: "Buy",
    priceMin:    30900000,
    priceMax:    36200000,
    price:       "₹3.09 Cr – 3.62 Cr",
    name:        "Sawasdee Heights",
    locality:    "Lawrence Road",
    city:        "Delhi",
    loc:         "Lawrence Road, Delhi",
    config:      "3BHK Apartment",
    bhk:         [3],
    area:        "1600 – 2100 sq.ft",
    builder:     "Galaxy Group Delhi",
    possession:  "Dec 2026",
    rera:        "DLRERA2023P0012",
    amenities:   ["Swimming Pool","Gym","Clubhouse","Children's Play Area","24/7 Security","Parking"],
    description: "Sawasdee Heights offers premium 3 BHK apartments in Lawrence Road, Delhi.",
    rating: 4.3, reviews: 71, featured: false, new: true,
  },
  {
    id: 6,
    img:    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    status:      "COMPLETED",
    type:        "Apartment",
    listingType: "Buy",
    priceMin:    52500000,
    priceMax:    52500000,
    price:       "₹5.25 Cr",
    name:        "Victoria 55",
    locality:    "Punjabi Bagh",
    city:        "Delhi",
    loc:         "Punjabi Bagh, Delhi",
    config:      "4BHK Apartment",
    bhk:         [4],
    area:        "3200 sq.ft",
    builder:     "Prabhatam Group",
    possession:  "Ready to Move",
    rera:        "DLRERA2020P0089",
    amenities:   ["Swimming Pool","Gym","Clubhouse","Terrace Garden","24/7 Security","Concierge","Parking"],
    description: "Victoria 55 is a boutique luxury residential project in Punjabi Bagh featuring limited edition 4 BHK apartments.",
    rating: 4.6, reviews: 39, featured: false, new: false,
  },
  {
    id: 7,
    img:    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    status:      "ONGOING",
    type:        "Apartment",
    listingType: "Rent",
    priceMin:    38200,
    priceMax:    40300,
    price:       "₹38,200 – ₹40,300 / mo",
    name:        "Maxvel Al Vista",
    locality:    "Rohini Sector 32",
    city:        "Delhi",
    loc:         "Rohini Sector 32, Delhi",
    config:      "3BHK Apartment",
    bhk:         [3],
    area:        "1800 sq.ft",
    builder:     "CRA Developers",
    possession:  "Available Now",
    rera:        "DLRERA2022P0034",
    amenities:   ["Gym","Parking","24/7 Security","Power Backup","Lift"],
    description: "Maxvel Al Vista offers well-maintained 3 BHK apartments for rent in Rohini Sector 32.",
    rating: 4.1, reviews: 22, featured: false, new: true,
  },
  {
    id: 8,
    img:    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    ],
    status:      "COMPLETED",
    type:        "Villa",
    listingType: "Buy",
    priceMin:    85000000,
    priceMax:    120000000,
    price:       "₹8.5 Cr – 12 Crores",
    name:        "Prestige Falcon City",
    locality:    "Kanakapura Road",
    city:        "Bangalore",
    loc:         "Kanakapura Road, Bangalore",
    config:      "3, 4, 5 BHK Villa",
    bhk:         [3, 4, 5],
    area:        "3500 – 6200 sq.ft",
    builder:     "Prestige Group",
    possession:  "Ready to Move",
    rera:        "PRM/KA/RERA/1251/310/PR/180823/002456",
    amenities:   ["Swimming Pool","Gym","Spa","Clubhouse","Tennis Court","Golf Course","Private Garden","Smart Home"],
    description: "Prestige Falcon City is an ultra-luxury villa community on Kanakapura Road, Bangalore.",
    rating: 4.9, reviews: 312, featured: true,  new: false,
  },
];

// ── BLOGS ─────────────────────────────────────────────────────────────────────
// Add/edit/remove blogs here. img: Unsplash URL or "/images/blog1.jpg"
export const BLOGS = [
  {
    id: 1,
    img:      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    title:    "How To Choose The Right Service Apartment For A Long Term Stay",
    excerpt:  "When planning an extended stay in a new city, whether for work or leisure, choosing the right service apartment can make all the difference to your comfort and productivity.",
    body: `
When planning an extended stay in a new city, choosing the right service apartment is critical. Unlike hotels, service apartments offer more space, a full kitchen, and a home-like environment — ideal for stays longer than a week.

**Key factors to consider:**

1. **Location** — Proximity to your workplace, metro stations, and daily essentials like grocery stores and hospitals matters a lot for long-term comfort.

2. **Lease flexibility** — Look for apartments offering monthly leases with the option to extend. Avoid those that lock you into 6-month or annual contracts if your stay is uncertain.

3. **Furnished vs semi-furnished** — Most service apartments come fully furnished. Verify whether utilities (electricity, internet, housekeeping) are included in the rent.

4. **Safety and security** — 24/7 security, CCTV coverage, and secure parking are non-negotiable for long stays.

5. **Community amenities** — Gym, rooftop, co-working spaces and social events can make a big difference to your well-being during an extended stay.

6. **Reviews and reputation** — Always read recent reviews from verified tenants. Pay special attention to feedback about maintenance responsiveness and utility issues.

A little research before you sign can save you months of inconvenience. Happy house-hunting!
    `.trim(),
    date:     "August 4, 2025",
    author:   "Priya Mehta",
    authorImg:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    category: "Buying Guide",
    readTime: "5 min read",
    tags:     ["Service Apartment","Long Stay","Rental Tips"],
  },
  {
    id: 2,
    img:      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    title:    "Top Localities For Ready Possession Apartments Near You",
    excerpt:  "Finding a ready-to-move apartment in Hyderabad can be a challenge with so many options. Here is our curated guide to the best localities.",
    body: `
Ready-to-move apartments are in high demand across India's major cities. Whether you are avoiding construction delays or simply want to move in immediately, here are the top localities to consider.

**Delhi NCR**
- **Dwarka Sector 12** — Well-connected, affordable, large society complexes with all amenities.
- **Noida Sector 137** — IT hub with excellent metro connectivity and ready inventory.
- **Gurgaon Sector 82** — Premium projects, proximity to cyber city, good schools nearby.

**Bangalore**
- **Whitefield** — Tech corridor with ready flats across all budgets.
- **Sarjapur Road** — Growing infrastructure, large gated communities.

**Pune**
- **Kothrud** — Established locality, excellent connectivity, strong resale value.
- **Baner** — Trendy, close to IT parks, vibrant social scene.

**Tips for buying ready-to-move:**
1. Always visit in person — photos can be misleading.
2. Verify OC (Occupancy Certificate) is obtained.
3. Check for pending dues from the previous owner.
4. Negotiate — sellers of ready properties are often more flexible.
    `.trim(),
    date:     "August 4, 2025",
    author:   "Rohan Kapoor",
    authorImg:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    category: "Market Trends",
    readTime: "7 min read",
    tags:     ["Ready to Move","Delhi","Bangalore","Pune"],
  },
  {
    id: 3,
    img:      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
    title:    "Top Localities For Ready To Move Apartments In Hyderabad In 2025",
    excerpt:  "Hyderabad's real estate market continues to evolve rapidly, with several localities emerging as hotspots for ready-to-move apartments.",
    body: `
Hyderabad has emerged as one of India's fastest-growing real estate markets, driven by its booming IT sector and improving infrastructure.

**Top localities in 2025:**

**HITEC City & Madhapur**
The epicentre of Hyderabad's IT revolution. Premium ready apartments are available from ₹80L to ₹3Cr. Excellent connectivity to Gachibowli and Kondapur.

**Gachibowli**
Close to financial district offices of Google, Amazon, and Microsoft. Well-developed social infrastructure with malls, hospitals, and schools.

**Kompally**
More affordable option in North Hyderabad. Growing residential demand from mid-income buyers.

**Narsingi**
Premium township developments. Popular with senior executives looking for luxury living close to the financial district.

**Market Snapshot 2025:**
- Average appreciation YoY: 12–18% in prime areas
- Rental yield: 3–4.5% in IT corridors
- Inventory overhang: less than 8 months in ready segment

Now is a good time to invest in Hyderabad's ready segment before prices rise further ahead of the upcoming metro expansion.
    `.trim(),
    date:     "July 25, 2025",
    author:   "Ananya Sharma",
    authorImg:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    category: "City Guide",
    readTime: "6 min read",
    tags:     ["Hyderabad","2025","Investment","IT Corridor"],
  },
  {
    id: 4,
    img:      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=600&q=80",
    title:    "A Neighbourhood Wise Guide To Ready Apartments In Chennai",
    excerpt:  "Chennai's real estate landscape offers a diverse array of ready-to-move apartments across its many vibrant neighbourhoods.",
    body: `
Chennai, with its stable economy and strong cultural identity, offers one of India's most reliable real estate markets. Here's a neighbourhood-by-neighbourhood guide.

**Anna Nagar**
One of Chennai's most sought-after localities. Known for its wide tree-lined avenues, excellent schools, and social infrastructure. Premium ready apartments range ₹1.2Cr–₹4Cr.

**OMR (Old Mahabalipuram Road)**
The IT corridor of Chennai. Large gated communities with all amenities. More affordable than Anna Nagar. Strong rental demand from IT professionals.

**Velachery**
Mid-segment powerhouse. Excellent metro connectivity. Affordable for first-time buyers — ₹50L–₹1.2Cr range.

**Adyar**
Prestigious southern locale. Proximity to IIT Madras and beach. Limited inventory but strong appreciation history.

**Perumbakkam**
Emerging affordable destination. Good infrastructure development underway. Ideal for budget-conscious buyers.

**What to look out for in Chennai:**
- Flooding history — check if the locality is flood-prone
- CMDA vs DTCP approval
- Proximity to the upcoming metro Phase 2 corridors
    `.trim(),
    date:     "July 25, 2025",
    author:   "Vikram Nair",
    authorImg:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    category: "City Guide",
    readTime: "8 min read",
    tags:     ["Chennai","Neighbourhood Guide","Ready to Move"],
  },
  {
    id: 5,
    img:      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    title:    "10 Things to Check Before Buying an Under-Construction Property",
    excerpt:  "Under-construction properties offer attractive prices, but come with risks. Here is your complete due-diligence checklist before signing on the dotted line.",
    body: `
Buying an under-construction property can save you 15–25% compared to ready-to-move options, but the risks are real. Here's your 10-point checklist.

1. **RERA Registration** — Every project must be registered on the state RERA portal. Verify the RERA number and check if any complaints have been filed.

2. **Builder's Track Record** — How many projects has the builder completed? Were they delivered on time? Visit a completed project.

3. **Construction Progress** — Visit the site personally. Stalled construction is a red flag.

4. **Legal Clearances** — Land title, environmental clearance, building plan approval — ask for copies of all.

5. **Escrow Account** — Post RERA, builders must keep 70% of collections in an escrow. Verify this.

6. **Floor Plan & Carpet Area** — Get the exact carpet area (not super built-up) in writing. This is what you actually use.

7. **Possession Date** — Factor in a 6–12 month delay buffer. What is the penalty for delayed possession?

8. **Payment Plan** — Construction-linked plans are safer than time-linked plans. Avoid paying too much upfront.

9. **Home Loan Pre-approval** — Get your loan pre-approved before booking so you know your exact budget.

10. **Resale Restrictions** — Some projects restrict resale before possession. Read the sale agreement carefully.
    `.trim(),
    date:     "July 18, 2025",
    author:   "Priya Mehta",
    authorImg:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    category: "Buying Guide",
    readTime: "9 min read",
    tags:     ["Under Construction","Due Diligence","RERA","Home Buying"],
  },
  {
    id: 6,
    img:      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    title:    "How to Negotiate Property Prices Like a Pro in 2025",
    excerpt:  "Most buyers accept the asking price without question. A few smart negotiation tactics can save you lakhs.",
    body: `
Property negotiation is an art that most buyers shy away from. But in a buyer's market like 2025, you have more power than you think.

**Research before you negotiate:**
- Know the circle rate (government benchmark price)
- Compare 3–5 similar recent transactions in the same locality
- Check how long the property has been listed (longer = more negotiable)

**Effective tactics:**

1. **Start lower than you expect to pay** — Offer 10–15% below asking. The seller will counter, and you'll meet somewhere in the middle.

2. **Find legitimate deficiencies** — Aging plumbing, north-facing plot, top-floor without elevator — use these as negotiation chips.

3. **Cash/pre-approved buyer advantage** — If you have financing ready, sellers will often discount 2–4% for a quick, certain close.

4. **Bundle demands** — Instead of just asking for a lower price, ask for the price PLUS furniture, car parking, or 6 months' maintenance waived.

5. **Create urgency without desperation** — "I have another property I'm also looking at" is effective — but don't be dishonest.

6. **Negotiate on the date of possession too** — An earlier handover date may be worth ₹2–5L to the seller.

Remember: the worst they can say is no.
    `.trim(),
    date:     "July 10, 2025",
    author:   "Rohan Kapoor",
    authorImg:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    category: "Buying Guide",
    readTime: "6 min read",
    tags:     ["Negotiation","Property Tips","Home Buying","2025"],
  },
];

// ── ABOUT PAGE ─────────────────────────────────────────────────────────────────
// Edit all About Us content here
export const ABOUT = {
  // Hero section
  hero: {
    heading:  "High-Impact Infrastructure & \nReal Estate Development Company",
    subtext:  "Private Limited Company | Incorporated 24 April 2025, TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED has been India's most trusted property company — connecting Thousands of buyers, sellers and renters with verified listings across 400+ cities.",
    image:    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    // Replace with: "/images/about-hero.jpg"
  },

  // Mission & Vision
  mission: {
    heading: "Our Mission",
    text:    "To make India's real estate market transparent, accessible, and stress-free for every family — regardless of their budget or location.",
    icon:    "🎯",
  },
  vision: {
    heading: "Our Vision",
    text:    "To become a leading infrastructure developer in India. Strategic alignment with Government development initiatives Long-term asset creation & sustainable growth model.",
    icon:    "🔭",
  },

  // Company stats
  stats: [
    { number: "10,000+", label: "Properties Listed",     icon: "🏠" },
    { number: "400+",      label: "Cities Covered",        icon: "🌏" },
    { number: "2M+",       label: "Happy Families",        icon: "👨‍👩‍👧‍👦" },
    { number: "1 Year",  label: "Of Trust",              icon: "🏆" },
  ],

  // Story section
  story: {
    heading: "Our Story",
    paragraphs: [
      "Founded on 24 April 2025, Touch to Infinity Infra Solutions Private Limited was established with a vision to transform India'’'s infrastructure landscape through innovation, integrity, and strategic execution.",
      "From the very beginning, the company has been driven by a clear purpose — to contribute to nation-building by developing high-quality infrastructure and sustainable real estate projects. With its roots in New Delhi, the organization is strategically positioned to align with government-led development initiatives, ensuring long-term growth and impactful project delivery.",
      "Under the leadership of Amit Kumar and Madhurima Kundu, the company brings together strong expertise in strategic planning, project execution, and governance. Their combined leadership ensures a balance between visionary growth and operational excellence, enabling the company to participate actively in government tenders, PPP projects, and smart city missions.",
      "Touch to Infinity Infra Solutions operates across multiple core verticals including infrastructure development, water and sewage systems, and commercial & residential real estate, delivering projects through efficient EPC and turnkey models. The company focuses on building a scalable, compliant, and risk-managed business framework, making it a reliable partner for both public and private sector collaborations",
      "With a forward-looking expansion strategy starting from Delhi NCR to a nationwide footprint, the company is committed to creating long-term assets, sustainable growth, and high-value investment opportunities. Its mission is simple yet powerful —“To build infrastructure that not only supports growth but also shapes the future of the nation.”"
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    // Replace with: "/images/team-at-work.jpg"
  },

  // Team members — add/remove/edit freely
  team: [
    {
      name:   "Amit Kumar",
      role:   "Director",
      bio:    "Strategic Planning & Business Development Infrastructure Growth & Government Liaison Driving Long-Term Expansion Vision.",
      img:    "https://images.unsplash.com/photo-1560250097-0dc05ae24812?w=300&q=80",
      // Replace with: "/images/team/aditya.jpg"
      linkedin: "#",
    },
    {
      name:   "Madhurima Kundu",
      role:   "Director",
      bio:    "Operational & Administrative Leadership Project Coordination & Compliance Oversight Strengthening Corporate & Financial Structure .",
      img:    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80",
      linkedin: "#",
    },
  ],

  // Values
  values: [
    { icon: "🔍", title: "Transparency",  desc: "Every listing is verified. Every price is what you actually pay." },
    { icon: "🤝", title: "Trust",         desc: "1 year of trust with thousands of Indian families." },
    { icon: "⚡", title: "Speed",         desc: "Find, shortlist and contact sellers — all in under 10 minutes." },
    { icon: "💡", title: "Innovation",    desc: "We use AI, AR and data to make property search smarter." },
    { icon: "🌏", title: "Accessibility", desc: "We serve buyers and renters across 400+ cities, at every budget." },
    { icon: "❤️", title: "People First",  desc: "Our support team is real humans, available 7 days a week." },
  ],

  // Press/awards logos (text-based for now)
  awards: [
    { label: "Successfully aligned with Government tender participation frameworks",},
    { label: "Recognition through strategic participation in infrastructure and urban development initiatives"},
  ],
};

// ── CITIES dropdown ────────────────────────────────────────────────────────────
export const CITIES = [
  "Delhi","Mumbai","Bangalore","Pune","Hyderabad",
  "Chennai","Kolkata","Noida","Gurgaon",
];

// ── AMENITY icon map ───────────────────────────────────────────────────────────
export const AMENITY_ICONS = {
  "Swimming Pool":"🏊","Gym":"💪","Spa":"🧖","Clubhouse":"🏛️",
  "Tennis Court":"🎾","Golf Course":"⛳","Children's Play Area":"🛝",
  "24/7 Security":"🛡️","Power Backup":"⚡","Parking":"🚗",
  "Garden":"🌿","Smart Home":"🏠","Concierge":"🛎️",
  "Terrace Garden":"🌺","Gated Community":"🔐","Paved Roads":"🛣️",
  "Street Lights":"💡","Water Supply":"💧","Drainage":"🔧","Lift":"🛗",
  "Private Garden":"🌳",
};

// ── FOOTER links ───────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  
};
