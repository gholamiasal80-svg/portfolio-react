# Asal Gholami — Portfolio (React + Vite)

This is the React + Vite version of the portfolio website, converted from Next.js for simpler deployment to GitHub Pages.

---

## Run it locally

**Requirements:** Node.js 18 or newer. Download from [nodejs.org](https://nodejs.org) if you don't have it.

1. Open a terminal and navigate into the project folder:
   ```
   cd portfolio-react
   ```

2. Install dependencies (only needed the first time):
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

The site will live-reload as you save changes.

---

## Upload to GitHub

1. Go to [github.com](https://github.com) and create a new repository.
   - Name it exactly: `portfolio-react`
   - Set it to **Public**
   - Do **not** add a README (you already have one)

2. In the terminal, inside the `portfolio-react` folder, run these commands one by one:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio-react.git
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Deploy to GitHub Pages

After the code is on GitHub:

1. Build the site:
   ```
   npm run build
   ```

2. Deploy the `dist/` folder to the `gh-pages` branch:
   ```
   npm run deploy
   ```
   This uses the `gh-pages` package that is already included. It will publish your site automatically.

3. Go to your repository on GitHub → **Settings** → **Pages**.
   - Under "Branch", select `gh-pages` and click **Save**.

4. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/portfolio-react/
   ```
   It may take 1–2 minutes to appear after first deploy.

### Re-deploying after changes

Any time you make changes and want to update the live site:
```
npm run build
npm run deploy
```
That's it — no other steps needed.

---

## Project structure

```
portfolio-react/
├── public/              ← images and static files
├── src/
│   ├── components/      ← Header, Footer, slideshows, etc.
│   ├── pages/
│   │   ├── work/        ← KMP, Psych, Heinz case study pages
│   │   ├── Home.jsx
│   │   ├── Work.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── FineArt.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx          ← routing
│   └── main.jsx         ← entry point
├── index.html
├── vite.config.js
└── package.json
```
