# ⚡ SPEED ZONE – Website

Marthandam's premier vehicle customisation & tyre shop.

---

## 📁 Folder Structure

```
speedzone/
├── index.html              ← Main webpage (single page)
├── css/
│   ├── style.css           ← Main styles, variables, layout & components
│   ├── animations.css      ← Keyframes, scroll-reveal & motion utilities
│   └── responsive.css      ← Mobile / tablet media queries
├── js/
│   ├── particles.js        ← Hero canvas particle / spark system
│   ├── products.js         ← Product data, card rendering & modal
│   └── main.js             ← Nav, preloader, cursor, counters, tilt, etc.
└── README.md               ← This file
```

---

## 🚀 How to Run

**Option A – Direct file open**
Just double-click `index.html` in your file manager. Opens in any browser.

**Option B – Local dev server (recommended)**
```bash
# Python 3
cd speedzone
python3 -m http.server 8080
# Then open: http://localhost:8080
```

---

## ⚙️ Configuration

### 1. WhatsApp Number
Open `js/products.js` and update line 13:
```js
const WHATSAPP_NUMBER = '919999999999';
// Replace with your actual number, e.g.: '919876543210'
// Format: country code (91 for India) + 10-digit mobile number, NO spaces or +
```

### 2. WhatsApp for other links (Nav, EMI, Float button)
Search `index.html` for `wa.me/919999999999` and replace all instances.

### 3. Phone number display
Search `index.html` for `+91 99999 99999` and replace with your actual number.

### 4. Google Maps embed
The map in the Contact section currently shows general Marthandam coordinates.
Replace the `<iframe src="...">` in the contact section with your actual
Google Maps embed URL from **Google Maps → Share → Embed a map**.

---

## 🛍️ Adding / Editing Products

Open `js/products.js` and add a new object to the `PRODUCTS` array:

```js
{
  id: 99,                       // unique number
  name: 'Product Name',
  category: 'new-tyres',        // see categories below
  price: '₹1,500',
  tag: 'Popular',               // Popular | New | Budget | Hot | Safety | Gear | Premium | Service | Custom
  desc: 'Short description shown on card.',
  details: 'Longer details shown in the modal popup.',
},
```

**Available categories:**
| Value          | Label         |
|----------------|---------------|
| `new-tyres`    | New Tyres     |
| `used-tyres`   | Used Tyres    |
| `accessories`  | Accessories   |
| `modifications`| Modifications |
| `riding-gear`  | Riding Gear   |
| `car-mod`      | Car Mods      |

---

## 🎨 Changing Colors / Theme

All colors are CSS variables in `css/style.css`:
```css
:root {
  --fire:       #FF4400;   /* Main accent (orange-red) */
  --gold:       #FFD700;   /* Prices, counters */
  --cyan:       #00E5FF;   /* Highlight accent */
  --black:      #070709;   /* Background */
}
```

---

## 📱 Features

- ✅ Fully responsive (mobile / tablet / desktop)
- ✅ Custom animated cursor (desktop)
- ✅ Particle / spark canvas in hero section
- ✅ Preloader with progress bar
- ✅ Sticky navbar with scroll effect
- ✅ Animated counters (28788 tyres sold)
- ✅ Scroll-reveal animations on all sections
- ✅ 3D tilt on service cards
- ✅ Product filter (7 categories, 28 products)
- ✅ Product modal with full details
- ✅ WhatsApp Buy Now redirect per product
- ✅ Marquee ticker strip
- ✅ Bajaj EMI section
- ✅ Google Maps embed
- ✅ WhatsApp floating button
- ✅ Reduced-motion support
- ✅ Print styles

---

## 📸 How to Add Product Images

### Step 1 – Create the folder
Inside your `speedzone/` folder, create:
```
speedzone/
└── assets/
    └── products/        ← create this folder
        ├── mrf-zapper.jpg
        ├── apollo-actizig.jpg
        ├── led-headlight.jpg
        └── (your images here...)
```

### Step 2 – Name your image files
Use simple lowercase names with hyphens. Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Step 3 – Add the `image` field to the product in `products.js`

Open `js/products.js` and find the product you want to update. Add the `image` field:

```js
{
  id: 1,
  name: 'MRF Zapper F',
  category: 'new-tyres',
  price: '₹1,200',
  tag: 'Popular',
  image: 'assets/products/mrf-zapper.jpg',   // ← ADD THIS LINE
  desc: 'High-grip tubeless front tyre...',
},
```

### ✅ That's it!
- Products **with** `image` → shows your real photo
- Products **without** `image` → shows the icon placeholder automatically
- If an image file is missing or broken → auto-falls back to the icon (no broken image shown)
- Images also appear in the modal popup when you click "More details"

### 💡 Image tips
- Recommended size: **600 × 400 px** minimum
- Keep file size under **200 KB** for fast loading (use [squoosh.app](https://squoosh.app) to compress)
- Use a plain or white background for clean card look
- All formats work: JPG, PNG, WEBP

---

## 🌐 Deployment

Upload the entire `speedzone/` folder to any web host:
- **Free:** Netlify, Vercel, GitHub Pages
- **Paid shared hosting:** Upload via cPanel File Manager or FTP

For GitHub Pages:
```bash
git init
git add .
git commit -m "Speed Zone website"
git push origin main
# Enable Pages in repo Settings → Pages → main branch
```

---

*Built for Speed Zone, Marthandam 🔥*
