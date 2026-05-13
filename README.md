# Next.js Simple UI App

A simple Next.js App Router project with a clean homepage and two extra routes.

## Routes

- `/` - Homepage with a small hero section and feature cards
- `/get-started` - Starter guide page
- `/learn-more` - Additional info page

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev     # start development server
npm run build   # create production build
npm run start   # run production server
npm run lint    # run eslint
```

## Project Structure

```text
app/
  page.tsx
  get-started/page.tsx
  learn-more/page.tsx
  layout.tsx
  globals.css
```

## Notes

- Built with Next.js (App Router) and Tailwind CSS.
- Main UI entry point: `app/page.tsx`.
