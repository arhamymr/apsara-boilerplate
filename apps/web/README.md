# UI Kit Frontend - Pure Frontend with Better Auth

*Frontend-only UI kit with stateless authentication using Better Auth*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/muhammad-arhams-projects-fe8f7501/v0-web-app-with-dashboard)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/rBWcx4M3tjf)

## Overview

This is a pure frontend UI kit built with Next.js, featuring a comprehensive component library and stateless authentication using Better Auth. No backend database required - perfect for showcasing UI components and integrating with external APIs.

## Features

- 🎨 **Complete UI Component Library** - Built with Radix UI and Tailwind CSS
- 🔐 **Stateless Authentication** - Better Auth with social providers (GitHub, Google)
- 🌙 **Dark/Light Mode** - Theme switching with next-themes
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Development** - Hot reload and TypeScript support
- 🚀 **Zero Backend** - Pure frontend, no database needed

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd ui-kit-frontend
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your OAuth providers in `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Authentication Setup

This project uses Better Auth in **stateless mode** - no database required! 

### Supported Providers
- GitHub OAuth
- Google OAuth
- More providers can be easily added

### How it works
- Sessions are stored in secure HTTP-only cookies
- No user data is persisted on the server
- Perfect for frontend-only applications
- Integrates seamlessly with external backends

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...
├── lib/                  # Utility functions and configurations
│   ├── auth.ts          # Better Auth server configuration
│   ├── auth-client.ts   # Better Auth client configuration
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Available Components

- **Authentication**: Login/Register forms with social providers
- **Navigation**: Headers, sidebars, breadcrumbs
- **Data Display**: Tables, cards, lists
- **Forms**: Input fields, selectors, validation
- **Feedback**: Alerts, toasts, modals
- **Layout**: Grids, containers, sections

## Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Development

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with CSS Variables
- **Components**: Radix UI primitives
- **Authentication**: Better Auth (stateless)
- **TypeScript**: Full type safety
- **Package Manager**: pnpm

## Contributing

This is a UI kit template. Feel free to:
- Add new components
- Improve existing ones
- Add more authentication providers
- Enhance the documentation

## License

MIT License - feel free to use this in your projects!
