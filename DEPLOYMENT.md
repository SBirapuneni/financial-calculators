# Deployment Guide

This guide explains how to build and deploy the Financial Calculators application.

## Quick Start

### Using the Deployment Script

```bash
# Make script executable (first time only)
chmod +x deploy.sh

# Start local development
./deploy.sh dev

# Build for production
./deploy.sh build

# Deploy to production
./deploy.sh deploy

# Verify deployment
./deploy.sh verify
```

### Using npm Scripts

```bash
# Local development
npm run dev

# Build and test locally
npm run build
npm run start

# Deploy to production
npm run deploy

# Deploy to preview
npm run deploy:preview

# Check deployment status
npm run deploy:status

# Verify production
npm run deploy:verify
```

## Deployment Commands

### Local Development

```bash
# Start development server (http://localhost:3000)
./deploy.sh dev
# or
npm run dev
```

**What it does:**
- Checks if `.env.local` exists
- Verifies environment variables
- Starts Next.js dev server with hot reload

### Build for Production

```bash
# Build optimized production bundle
./deploy.sh build
# or
npm run build
```

**What it does:**
- Validates `.env.local`
- Checks environment variables
- Creates optimized production build in `.next` folder
- Shows bundle size and optimization info

### Test Production Locally

```bash
# Run production build locally
./deploy.sh test
# or
npm run build && npm run start
```

**What it does:**
- Uses production build from `.next`
- Runs on http://localhost:3000
- Simulates production environment

### Deploy to Production

```bash
# Deploy to Vercel production
./deploy.sh deploy
# or
npm run deploy
```

**What it does:**
1. Checks for uncommitted changes
2. Prompts to commit and push if needed
3. Verifies Vercel environment variables
4. Deploys to production (https://financialcalc.vercel.app)
5. Auto-assigns production domain

### Deploy to Preview

```bash
# Create preview deployment
./deploy.sh preview
# or
npm run deploy:preview
```

**What it does:**
- Creates preview deployment on unique URL
- Useful for testing before production
- Each preview gets unique URL (e.g., `financial-calculators-abc123.vercel.app`)

### Check Status

```bash
# View deployment status
./deploy.sh status
# or
npm run deploy:status
```

**What it does:**
- Lists recent Vercel deployments
- Shows environment variables
- Displays deployment URLs

### Verify Production

```bash
# Verify production is working
./deploy.sh verify
# or
npm run deploy:verify
```

**What it does:**
- Tests production URL (200 status)
- Verifies Google Analytics code
- Checks all 10 calculator pages
- Reports any issues

### Check Environment Variables

```bash
# Check local environment setup
./deploy.sh check
```

**What it does:**
- Verifies `.env.local` exists
- Checks if Google Analytics ID is configured
- Shows placeholder warnings

### Install Dependencies

```bash
# Install/update dependencies
./deploy.sh install
```

## Deployment Workflows

### Standard Production Deployment

```bash
# 1. Make your changes
# 2. Test locally
./deploy.sh dev

# 3. Build and verify
./deploy.sh build
./deploy.sh test

# 4. Commit changes
git add .
git commit -m "feat: Add new feature"
git push origin main

# 5. Deploy to production
./deploy.sh deploy

# 6. Verify deployment
./deploy.sh verify
```

### Quick Deploy (Auto-commit)

```bash
# Deploy script will handle git operations
./deploy.sh deploy
# Script will:
# - Detect uncommitted changes
# - Prompt for commit message
# - Auto-commit and push
# - Deploy to production
```

### Preview Before Production

```bash
# 1. Create preview deployment
./deploy.sh preview

# 2. Test preview URL
# Visit the preview URL shown in output

# 3. If good, deploy to production
git push origin main  # Triggers auto-deploy
# or
./deploy.sh deploy
```

### Emergency Hotfix

```bash
# 1. Make critical fix
# 2. Quick deploy
./deploy.sh deploy

# 3. Verify immediately
./deploy.sh verify

# 4. Check status
./deploy.sh status
```

## Environment Setup

### First Time Setup

```bash
# 1. Clone repository
git clone https://github.com/SBirapuneni/financial-calculators.git
cd financial-calculators

# 2. Install dependencies
npm install

# 3. Create .env.local
cp .env.example .env.local

# 4. Add your Google Analytics ID
# Edit .env.local:
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID

# 5. Start development
./deploy.sh dev
```

### Setting Up Vercel

```bash
# 1. Install Vercel CLI globally (optional)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link to existing project (if needed)
vercel link

# 4. Add environment variables
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
# Enter: G-JVHMR8RYRY

# 5. Deploy
./deploy.sh deploy
```

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
./deploy.sh build
```

### Environment Variables Not Working

```bash
# Check local variables
cat .env.local

# Check Vercel variables
vercel env ls

# Pull Vercel variables to local
vercel env pull .env.vercel
```

### Deployment Fails

```bash
# Check status
./deploy.sh status

# Check Vercel logs
vercel logs

# Redeploy with force
vercel --prod --force
```

### Google Analytics Not Tracking

```bash
# 1. Verify environment variable
./deploy.sh check

# 2. Verify in production
./deploy.sh verify

# 3. Check in browser
# Open DevTools > Network tab
# Filter: "google-analytics"
# Should see requests to googletagmanager.com
```

## Continuous Deployment

### Auto-Deploy on Git Push

Vercel automatically deploys when you push to GitHub:

```bash
# Any push to main branch triggers deployment
git push origin main

# Check deployment status
./deploy.sh status
```

### Manual Deploy

```bash
# Deploy without pushing to git
./deploy.sh deploy
```

## Production URLs

- **Production**: https://financialcalc.vercel.app
- **Preview**: Unique URL for each deployment
- **Custom Domain**: Can be added in Vercel dashboard

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally (`npm run dev`)
- [ ] Production build works (`npm run build`)
- [ ] Environment variables configured
- [ ] Google Analytics tracking verified
- [ ] All 10 calculators working
- [ ] No console errors
- [ ] Changes committed to git
- [ ] README updated (if needed)

## Script Options Summary

| Command | NPM Script | Description |
|---------|------------|-------------|
| `./deploy.sh dev` | `npm run dev` | Start local development |
| `./deploy.sh build` | `npm run build` | Build for production |
| `./deploy.sh test` | `npm run start` | Test production locally |
| `./deploy.sh deploy` | `npm run deploy` | Deploy to production |
| `./deploy.sh preview` | `npm run deploy:preview` | Deploy to preview |
| `./deploy.sh status` | `npm run deploy:status` | Check deployment status |
| `./deploy.sh verify` | `npm run deploy:verify` | Verify production |
| `./deploy.sh check` | - | Check environment vars |
| `./deploy.sh install` | `npm install` | Install dependencies |
| `./deploy.sh help` | - | Show help |

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables Guide](./SECURITY.md#environment-variables-setup)
- [GitHub Repository](https://github.com/SBirapuneni/financial-calculators)

---

**Need Help?** 
- Check `./deploy.sh help` for all commands
- See [SECURITY.md](./SECURITY.md) for environment variable details
- Review Vercel logs: `vercel logs`
