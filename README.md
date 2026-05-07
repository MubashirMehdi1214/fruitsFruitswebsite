# Health Fruits Tips - Next.js 14 Blog

## Setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build production: `npm run build`

## Environment variables
Update `.env.local`:
- `NEXT_PUBLIC_ADSENSE_ID` for Google AdSense publisher ID
- `NEXT_PUBLIC_GA_ID` for Google Analytics 4 measurement ID
- `NEXT_PUBLIC_SITE_URL` for canonical URLs and sitemap
- `NEXT_PUBLIC_SITE_NAME` for branding

## AdSense setup
Replace `ca-pub-XXXXXXXXXXXXXXXX` in `.env.local` with your real publisher ID.
Ad placeholders are visible in development and real ad tags are used in production.

## Google Analytics setup
Replace `G-XXXXXXXXXX` in `.env.local` with your GA4 ID.
Tracking is loaded with `next/script` using `afterInteractive`.

## Deploy to Vercel
1. Push repository to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel Project Settings
4. Deploy

## Connect custom domain
1. Open Vercel Project > Settings > Domains
2. Add your domain
3. Configure DNS records as shown by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` to your final domain
