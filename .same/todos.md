# Rohrreinigun Project

## Completed
- [x] Cloned repository from GitHub (Exxd00/Rohrreinigun)
- [x] Installed dependencies with bun
- [x] Started development server
- [x] Fixed all image paths to use repository images
  - Updated gallery images from `/images/gallery/...` to `/images/...`
  - Added all before/after pairs for: Abflussreinigung, Kanalreinigung, Rohrreinigung, Inspektion, Notdienst
  - Added team members with correct image paths
  - Added team group and service images
- [x] Fixed floating stats card positioning in AboutUs section
  - Added proper padding to section (pb-24 md:pb-32)
  - Fixed card positioning (right-2 md:right-4 instead of -right-2 md:-right-6)
  - Added z-index for proper layering
  - Increased grid margin (mb-20 instead of mb-16)
- [x] Pushed changes to GitHub repository

## Available Images in Repository
Located in `/public/images/`:
- **Abflussreinigung**: 1, 2, 3 (before/after pairs)
- **Kanalreinigung**: 1, 2, 3 (before/after pairs)
- **Rohrreinigung**: 2 (before/after pair)
- **Inspektion**: 1, 2 (before/after pairs)
- **Notdienst**: 1, 2, 3 (before/after pairs)
- **Team**: team-1.jpg, team-2.jpg, team-3.jpg, team-group.jpg, team-service.jpg

## Project Overview
This is a German pipe cleaning/plumbing service website (Rohrreinigung) built with:
- Next.js 15 with Turbopack
- shadcn/ui components
- Tailwind CSS
- TypeScript

## Features
- Service pages with before/after image galleries
- Contact forms
- City-specific pages
- SEO with robots.ts and sitemap.ts
- Dark/light theme toggle
