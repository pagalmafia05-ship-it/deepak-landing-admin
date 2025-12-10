# deepak-landing-clone

## Steps to run locally:
1. `npm install`
2. `npm run dev` (open http://localhost:5173)

## Admin panel:
- Open `/admin` route (eg: http://localhost:5173/admin)
- Default password in code: `admin123` (change before publishing)
- Use fields to change hero text, telegram link, avatar URL, features, and testimonials.
- Save stores data in `localStorage` so the main page will show updated data.
- Use Export/Import to move configuration between machines.

## Deploy on GitHub Pages / Vercel:
- Push repo to GitHub. On Vercel choose **Import Project** → select this repo → Deploy  
  (Vercel supports Vite by default)
- For GitHub Pages:  
  - Run `npm run build`  
  - Upload / publish the `dist` folder

## Notes:
- This is a **static site**. For a fully secure admin panel, you would need a backend + database (not included here).
- Change `ADMIN_PASS` in `src/AdminPanel.jsx` **before sharing publicly**.