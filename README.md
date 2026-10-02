# 👑 Luxury Pakistani Wedding Invitation — Interactive Full-Screen Web Experience

A modern, cinematic, full-screen digital wedding invitation web application featuring a deep **emerald green + almost-black + antique gold** palette, authentic **Mughal architectural aesthetics**, and a multi-step **3D envelope opening and closing animation**.

Built with **HTML5, CSS3, JavaScript (ES6+), and Node.js (Express)**.

---

## 🌟 Key Highlights

- **Full-Screen Immersive Canvas**: Uses the entire laptop, desktop, and mobile viewport without margins or generic website clutter.
- **Cinematic 3D Envelope**: Realistic envelope with textured paper, gold foil borders, Mughal corner flourishes, and a 3D golden wax seal.
- **Multi-Step Opening Animation**:
  1. "OPEN INVITATION" button fades smoothly.
  2. Golden wax seal pulses with warm ambient glow.
  3. Envelope flap rotates open in realistic 3D perspective.
  4. Inner card insert rises out of the pocket.
  5. Card expands to fill the screen with burst particles.
  6. Transition into the full-screen emerald wedding experience.
- **Reversible 3D Close Experience**: Click "CLOSE INVITATION" anytime to fold the card back into the envelope and seal it.
- **Wedding Sections Included**:
  - **Hero**: Grand Mughal cusped arch framing, romantic calligraphy, date & venue pills.
  - **Wedding Events**: 4 dedicated cards (**Mehndi**, **Nikah**, **Baraat**, **Walima**) with gold foil borders, custom icons, dress codes, and hover elevations.
  - **Our Story**: Elegant vertical timeline with glowing nodes from the first meeting to the wedding day.
  - **Moments & Memories Gallery**: High-res vector artwork with hover zooms and a built-in Fullscreen Lightbox (keyboard and touch supported).
  - **The Grand Venue**: Address, venue amenities, and a direct Google Maps button.
  - **RSVP Form**: Interactive attendance RSVP, event selection checkboxes, and input validation that saves submissions to `data/rsvps.json` with an animated confirmation card.
- **Floating Gold Dust Particle Canvas**: 60fps lightweight gold particle engine.
- **Audio Experience**: Floating music toggle (♪). Includes a built-in Web Audio API sitar/harp ambient synthesizer that works automatically even before adding your own MP3!

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** installed on your computer.

### 2. Install Dependencies
Open your terminal (PowerShell, Command Prompt, or VS Code Terminal) in the project folder and run:

```bash
npm install
```

*(Note for Windows PowerShell users: if script execution policy restricts `npm`, you can run `npm.cmd install`)*

### 3. Start the Localhost Server
Run either of the following commands:

```bash
npm run dev
```
or
```bash
npm start
```

### 4. Open in Your Browser
Once started, open your web browser (Chrome, Edge, Firefox, Safari) and navigate to:

👉 **`http://localhost:3000`**

---

## 🎨 Customization Guide

### 1. How to Replace Bride & Groom Names, Dates & Venues
Open **`index.html`** in any code editor (like VS Code). Search and replace:

| Placeholder in `index.html` | What to replace with | Example |
|---|---|---|
| `[BRIDE NAME]` | The bride's name | `Areeba Khan` |
| `[GROOM NAME]` | The groom's name | `Zain Malik` |
| `[B & G]` | The couple's monogram | `A & Z` |
| `[DAY, DATE MONTH]` | Main wedding day & date | `Saturday, 14 November` |
| `[YEAR]` | Year of celebration | `2026` |
| `[TIME]` | Time of event | `7:30 PM` |
| `[VENUE NAME]` | Name of venue | `The Royal Palm Banquet Hall` |
| `[VENUE ADDRESS]` | Full address | `54-Canal Bank Road, Lahore` |
| `[RSVP Date]` | Deadline for RSVPs | `1st November 2026` |

You can also customize the individual dates, times, and venues for the 4 events (**Mehndi**, **Nikah**, **Baraat**, **Walima**) directly inside the `events-grid` section in `index.html`.

---

### 2. How to Replace Gallery Photographs
All gallery images are stored in:
`assets/images/`

- `gallery-1.svg` (or `.jpg`, `.png`, `.webp`)
- `gallery-2.svg`
- `gallery-3.svg`
- `gallery-4.svg`
- `gallery-5.svg`
- `gallery-6.svg`

To use your real wedding photos:
1. Place your photos into the `assets/images/` folder (e.g. `couple-1.jpg`, `mehndi.jpg`).
2. In `index.html`, update the `src` attributes of the `<img>` tags inside `<section id="gallery">`.
3. In `js/script.js`, update the `galleryData` array paths and captions to match your photos.

---

### 3. How to Add Custom Background Music
1. Save your MP3 music file inside:
   **`assets/music/ambient.mp3`**
2. The application will immediately play your MP3 when the user clicks the floating music button (♪) or when the card opens.
3. *If no audio file is provided, the application automatically uses its built-in acoustic harp/sitar synthesizer so you always have soothing sound!*

---

### 4. How to Customize Colors
All colors are centralized in **`css/style.css`** under `:root`:

```css
:root {
  /* Emerald Green Backgrounds */
  --bg-darkest: #020704;       /* Deepest near-black */
  --bg-dark: #050e09;          /* Rich background shade */
  --bg-emerald-deep: #061911;  /* Deep emerald */
  --bg-emerald-card: #092418;  /* Card surface */
  
  /* Antique Gold Accents */
  --gold-primary: #d4af37;     /* Pure antique gold */
  --gold-light: #f5e0a0;       /* Champagne highlight */
  --gold-dark: #91722e;        /* Dark burnished gold */
  
  /* Warm Ivory Text */
  --text-ivory: #faf6ed;       /* Main readable typography */
  --text-ivory-dim: #e4ddcf;   /* Subtitle typography */
}
```

---

### 5. Managing RSVPs
When guests fill out the RSVP form, their response is automatically submitted via `POST /api/rsvp` and saved locally in:

📁 **`data/rsvps.json`**

You can also view all submitted RSVPs anytime in your browser by opening:
👉 **`http://localhost:3000/api/rsvps`**

---

## 📁 Project Architecture

```
Wedding Card/
│
├── package.json              # Project dependencies & start scripts
├── server.js                 # Express server with RSVP API & static delivery
├── index.html                # Semantic, full-screen invitation markup
│
├── css/
│   └── style.css             # Emerald & antique gold design system + 3D animations
│
├── js/
│   └── script.js             # 3D envelope sequence, particle engine, audio, lightbox, RSVP
│
├── assets/
│   ├── images/               # High-res gallery artworks & Mughal jali patterns
│   ├── icons/                # Mehndi, Nikah, Baraat & Walima gold vector icons
│   └── music/                # Custom ambient MP3 audio directory
│
├── data/
│   └── rsvps.json            # Local database of guest RSVP responses
│
└── README.md                 # Complete documentation
```

---

## 💍 Mubarak & Happy Celebrating!
Designed for a truly unforgettable digital wedding celebration.
