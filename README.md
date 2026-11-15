# K. Vijay Prasanth — 3D Developer Portfolio

Personal portfolio website for **K. Vijay Prasanth**, final-year B.E. Computer Science and Engineering student and aspiring Java / Software Developer based in Bangalore, India.

## Tech Stack

- **React 19** (Functional Components & Hooks)
- **JavaScript (ES6+)**
- **React Router** (`react-router-dom`)
- **Framer Motion** (`framer-motion`)
- **Pure CSS3** (Custom CSS variables, CSS 3D transforms, responsive media queries)
- **HTML5 Canvas** (Custom mouse-reactive particle system)
- **Vite** (Development server & production bundler)

## Pages & Features

- **Home (`/`)**: Word-by-word animated hero headline, 3D floating tech stack centerpiece, interactive canvas particles, and featured project preview.
- **About (`/about`)**: Personal introduction, 3D-tilting profile visual placeholder, academic timeline, and professional interests.
- **Skills (`/skills`)**: Categorized interactive skill cards with 3D hover/tap inspection.
- **Projects (`/projects` & `/projects/:slug`)**: Cursor-tracked 3D project cards, category filtering, mobile tap-to-expand details, and individual case study pages.
- **Articles (`/articles`)**: Search, category filters, date sorting, pagination, and preview modal.
- **Coding Profiles (`/profiles`)**: Verified links to GitHub and LeetCode, plus placeholder slots for additional platforms.
- **Contact (`/contact`)**: Validated contact form with `mailto:` dispatch, copy-to-clipboard email (`vijayprasanth2005@gmail.com`), and social links.
- **Resume Download**: Checks for `public/resume.pdf` and opens a clean fallback summary dialog when the PDF has not yet been uploaded.

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (http://localhost:3000)
npm run dev

# 3. Create a production build (outputs to dist/)
npm run build
```

## Adding Your Resume

Place your compiled PDF file at:

```text
public/resume.pdf
```

Once present, clicking **Resume** / **Download Resume** anywhere on the site downloads `K_Vijay_Prasanth_Resume.pdf` directly.

## How to Push This Project to GitHub (`VijayPrasanth17/portfolio`)

### Option A: Push Using Google AI Studio
1. Click the **GitHub** icon/button in the Google AI Studio top toolbar.
2. Sign in with your `VijayPrasanth17` GitHub account and select or create the `portfolio` repository.
3. Confirm the sync/push.

### Option B: Push From Your Local Computer
1. Download/export the project ZIP from AI Studio and extract it locally.
2. Open a terminal inside the extracted project folder and run:

```bash
# Initialize Git on the main branch (if not already initialized)
git init -b main

# Stage and commit all files
git add .
git commit -m "Initial commit: K. Vijay Prasanth 3D developer portfolio"

# Connect your GitHub repository
git remote add origin https://github.com/VijayPrasanth17/portfolio.git

# Push to GitHub
git push -u origin main
```

If `https://github.com/VijayPrasanth17/portfolio` already has an initial commit or README on GitHub, pull and merge before pushing:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Deployment (Vercel / Netlify)

- **Vercel**: Import `VijayPrasanth17/portfolio`, select **Vite**, use `npm run build` as the build command and `dist` as the output directory. Add a `vercel.json` SPA rewrite so sub-routes resolve to `index.html`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Netlify**: Connect `VijayPrasanth17/portfolio`, set Build Command to `npm run build`, Publish Directory to `dist`, and add `public/_redirects` containing:
  ```text
  /* /index.html 200
  ```
