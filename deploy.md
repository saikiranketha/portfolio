# 🚀 Portfolio Deployment Guide — Sai Kiran Ketha

This guide provides step-by-step instructions to deploy your **3D Interactive Developer Portfolio** to the web using the most popular, fast, and 100% free hosting platforms.

---

## 📁 Project Directory Structure

Before deploying, ensure your folder contains the following files:

```
portfolio/
├── index.html        # Main HTML structure
├── style.css         # Cyber glassmorphism design system
├── app.js            # Three.js 3D engine, tilt effects & controllers
├── deploy.md         # This deployment documentation
└── assets/           # Project screenshots & visual assets
    ├── smart_attendance.jpg
    ├── visionx_ai.jpg
    ├── ccbp_fullstack.jpg
    └── portfolio_3d.jpg
```

---

## ⚡ Option 1: Deploy Directly to NxtWave CCBP (`kethasaikiran.ccbp.tech`)

As an active NxtWave CCBP 4.0 Fellow, you can update and deploy this new 3D portfolio directly to your existing domain `https://kethasaikiran.ccbp.tech` using the CCBP IDE publishing CLI.

### Step-by-Step Instructions:

1. **Open NxtWave CCBP IDE / Code Playground**:
   - Log in to your CCBP dashboard and open your portfolio project workspace.

2. **Upload / Replace Portfolio Files**:
   - Place the following files in your CCBP root directory:
     - `index.html`
     - `style.css`
     - `app.js`
     - `assets/` folder (with `smart_attendance.jpg`, `visionx_ai.jpg`, `ccbp_fullstack.jpg`, `portfolio_3d.jpg`)

3. **Publish via CCBP CLI**:
   - Open the CCBP IDE integrated terminal and run:
     ```bash
     ccbp publish kethasaikiran
     ```
   - If prompted for confirmation, type `y` and press Enter.

4. **Verify Live Site**:
   - Open **`https://kethasaikiran.ccbp.tech`** in your browser (use `Ctrl + F5` or hard reload to clear cache) and enjoy your new 3D portfolio!

---

## 🌐 Option 2: Deploy to GitHub Pages (Recommended for Developers)

Hosting directly on GitHub gives you a clean URL like `https://saikiranketha.github.io` or `https://saikiranketha.github.io/portfolio`.

### Step-by-Step Instructions:

1. **Initialize Git in your portfolio folder (if not already done)**:
   Open terminal / PowerShell in `C:\Users\ADMIN\.gemini\antigravity-ide\scratch\portfolio` and run:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of 3D developer portfolio"
   ```

2. **Create a New Repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Repository name:
     - **For user site** (`https://saikiranketha.github.io`): name the repo `saikiranketha.github.io`
     - **For project site** (`https://saikiranketha.github.io/portfolio`): name the repo `portfolio`
   - Set visibility to **Public**.
   - Do **not** check "Initialize with README".
   - Click **Create repository**.

3. **Link Local Folder & Push Code**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/saikiranketha/saikiranketha.github.io.git
   git push -u origin main
   ```
   *(Replace with your repository URL)*

4. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment**:
     - Source: `Deploy from a branch`
     - Branch: Select `main` and `/ (root)`
     - Click **Save**.
   - Within 1–2 minutes, your live portfolio will be live at `https://saikiranketha.github.io`!

---

## ⚡ Option 3: Deploy to Vercel (Fastest with Zero Config)

Vercel provides ultra-fast global CDN edge caching, automatic HTTPS, and automatic deployments whenever you push to GitHub.

### Method A: Via Vercel Web Dashboard (1-Click)
1. Go to [vercel.com](https://vercel.com) and Sign In with your **GitHub** account.
2. Click **Add New...** > **Project**.
3. Select your portfolio repository from GitHub and click **Import**.
4. Leave settings as default (Framework Preset: *Other*, Root Directory: `./`).
5. Click **Deploy**.
6. In ~15 seconds, your site will be live on a free `.vercel.app` domain (e.g. `saikiranketha.vercel.app`).

### Method B: Via Vercel CLI
1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```
2. In the `portfolio` folder, run:
   ```bash
   vercel
   ```
3. Follow the quick terminal prompts to deploy instantly!

---

## 📦 Option 4: Deploy to Netlify (Drag & Drop or Git)

Netlify offers instant live previews and custom subdomains.

### Method A: Instant Drag & Drop (No Git Required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and log in.
2. Drag the entire `portfolio` folder from File Explorer into the browser drop zone.
3. Your site is deployed immediately with a live URL (e.g. `saikiran-portfolio.netlify.app`)!

### Method B: Via Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Run deploy command:
   ```bash
   netlify deploy --prod --dir=.
   ```

---

## 🛡️ Option 5: Deploy to Cloudflare Pages

Cloudflare Pages provides unlimited free bandwidth on the fastest global Anycast network.

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. Set Build Settings:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `.`
5. Click **Save and Deploy**.

---

## 🛠️ Local Testing Before Deployment

To preview or test the portfolio locally at any time:

### Using Python:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Using Node / npx:
```bash
npx -y serve .
```
Then open `http://localhost:3000` in your browser.

---

## 🎯 Post-Deployment Checklist

- [ ] Verify that 3D WebGL background and particle animations render smoothly at 60 FPS.
- [ ] Test the **Theme Switcher** (Dark / Light mode).
- [ ] Test the **1-Click Copy Email** button.
- [ ] Test the **View Full Resume** modal and print feature.
- [ ] Test the **Featured Projects** filter tabs and Case Study modals.
- [ ] Ensure all social links point to your correct profiles:
  - GitHub: `https://github.com/saikiranketha`
  - LinkedIn: `https://www.linkedin.com/in/sai-kiran-ketha/`
  - Email: `kethasaikiran123@gmail.com`
  - Phone: `+91 7569785117`
- [ ] Update your LinkedIn & GitHub profile bio with your newly deployed live link!
