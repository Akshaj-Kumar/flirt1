# Just For You ❤️ — Premium Romantic Surprise Interactive Website

> 🌐 **Live Website:** [https://akshaj-kumar.github.io/flirt1/](https://akshaj-kumar.github.io/flirt1/)  
> 📦 **GitHub Repository:** [https://github.com/Akshaj-Kumar/flirt1](https://github.com/Akshaj-Kumar/flirt1)  
> ⚡ **Vercel Claim Link:** [https://vercel.com/claim-deployment?code=ccecfbf3-7105-4f47-af74-4fe0c31f45ab](https://vercel.com/claim-deployment?code=ccecfbf3-7105-4f47-af74-4fe0c31f45ab)

A modern, cinematic, emotionally captivating interactive romantic surprise web experience built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

Designed with a 2026 dark romantic aesthetic, glowing neon pink aura, 3D animated envelope unsealing, interactive compliment cards, floating canvas particles, cursor sparkles, and lush ambient synthesizer music.

---

## ✨ Features & Storytelling Flow

1. **Cinematic Opening Experience (`IntroScreen`)**
   - Deep burgundy & dark ambient background (`#08050A`, `#270819`).
   - Central beating 3D heart with soft glowing radiant halo.
   - Typewriter text animation revealing:
     - *"Hey Beautiful ❤️"*
     - *"Do you even know how cute you are? 🥺"*
   - Glowing CTA: *"Open Your Surprise 💗"* triggering a particle heart explosion and audio initiation.

2. **Just For You Interactive Cards (`LoveMessages`)**
   - 5 interactive secret compliments:
     1. *"You look adorable"*
     2. *"You have the sweetest vibe"*
     3. *"You make things feel lighter"*
     4. *"You are naturally charming"*
     5. *"You make everything feel more special"*
   - Smooth popup modal reveal with personalized romantic messages and playful flirt quotes.
   - Dynamic progress tracker (`X / 5 revealed`).
   - Unlocks the next gateway: *"One more thing... 💌"*.

3. **Special Love Letter Section (`LoveLetter`)**
   - 3D interactive pink envelope with custom wax heart seal.
   - Realistic envelope opening & letter extraction with floating ascending hearts and chime sound.
   - Heartfelt romantic message formatted with elegant serif typography (`Playfair Display` & `Dancing Script`).
   - Seamless button: *"One more thing →"*.

4. **Emotional Final Surprise (`FinalSurprise`)**
   - Stylized cute couple illustration with animated floating balloon and glowing moon backdrop.
   - Romantic typography:
     - *"You'll always be special to me ❤️"*
     - *"Some people make the world a little more beautiful just by being in it."*
   - Interactive button: *"Send Some Love 💗"*.
   - Grand celebration with a multi-stage massive heart explosion and glowing neon *"I LOVE YOU"* banner.
   - Option to replay the experience (*"Experience Again 🔄"*).

5. **Visual FX & Audio Engine**
   - **Canvas Particle Engine**: Floating glowing hearts, rose petals, and soft bokeh orbs.
   - **Desktop Cursor Trail**: Luminous pink glow and sparkling mini-hearts following mouse movements (automatically disabled on touch screens).
   - **Web Audio API Engine**: Built-in harmonic electric piano chord progressions, cute heart pops, paper unsealing chimes, and celebration fanfares—zero external audio dependency failures.
   - **Music Controller**: Floating glassmorphism widget with animated equalizer bars, play/pause, and mute controls.

---

## 🎨 Color Palette & Typography

- **Background:** `#08050A`
- **Deep Burgundy:** `#270819`
- **Romantic Pink:** `#FF4FA3`
- **Soft Pink:** `#FFB6D9`
- **Rose Red:** `#FF315D`
- **Card Background:** `#F9C7DF`
- **White:** `#FFFFFF`

### Typography:
- **Dancing Script**: Cursive romantic headings.
- **Playfair Display**: Elegant handwritten letter body.
- **Poppins**: Clean, modern UI and readability.

---

## ⚙️ Personalization & Customization

All text, names, messages, quotes, and themes are centralized in [`src/config.js`](file:///c:/Users/Akshaj/Desktop/ai%20bundle/flirt1/src/config.js):

```javascript
export const surpriseConfig = {
  recipientName: "Beautiful", // Change to recipient's name (e.g. "Sophia")
  senderName: "Someone Who Admires You", // Change to your name
  siteTitle: "Just For You ❤️",

  intro: {
    greeting: "Hey Beautiful ❤️",
    subheading: "Do you even know how cute you are? 🥺",
    buttonText: "Open Your Surprise 💗",
  },
  
  // Custom compliment cards, love letter text & final surprise...
};
```

Simply update this file and the entire site reflects the new personalized content instantly!

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Quick Start (PowerShell)

```powershell
# Navigate into the project folder
cd "c:\Users\Akshaj\Desktop\ai bundle\flirt1"

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173` to experience the website.

### Production Build

```powershell
npm run build
```
The optimized production bundle will be generated inside the `dist/` directory.

---

## 🌐 Deployment to Vercel

The project includes a ready-to-deploy `vercel.json` configuration.

### Deploy via Vercel CLI:
```powershell
# In the flirt1 directory:
npx vercel
```

### Deploy via GitHub:
1. Initialize Git and commit your project:
   ```powershell
   git init
   git add .
   git commit -m "feat: complete premium romantic surprise website"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Push your repository:
   ```powershell
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```
4. Connect the repository to [Vercel](https://vercel.com/new) — Vercel will automatically detect Vite and deploy in seconds!

---

## 📁 Project Structure

```
flirt1/
├── dist/                   # Production build output
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── FinalSurprise.jsx       # Emotional ending & I LOVE YOU explosion
│   │   ├── InteractiveCursor.jsx   # Desktop glowing cursor trail
│   │   ├── IntroScreen.jsx         # Typewriter opening & glowing heart
│   │   ├── LoveLetter.jsx          # 3D interactive pink envelope & paper
│   │   ├── LoveMessages.jsx        # 5 secret compliment cards & popups
│   │   ├── MusicController.jsx     # Floating audio visualizer & mute toggle
│   │   └── ParticleBackground.jsx  # Floating hearts & petals canvas
│   ├── utils/
│   │   └── sound.js                # Web Audio synthesizer & romantic SFX
│   ├── App.jsx                     # Section coordinator & transitions
│   ├── config.js                   # Central personalization file
│   ├── index.css                   # Tailwind styles, glows, & glassmorphism
│   └── main.jsx                    # React entrypoint
├── .gitignore
├── index.html                      # HTML with Google Fonts & meta tags
├── package.json
├── postcss.config.js
├── README.md                       # Documentation & setup guide
├── tailwind.config.js              # Custom romantic design system
├── vercel.json                     # Vercel deployment config
└── vite.config.js                  # Vite bundler config
```

---

*Crafted with love, passion, and elegance ❤️*
