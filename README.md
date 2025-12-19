# 💰 Financial Calculators

A comprehensive suite of free, SEO-optimized financial calculators built with Next.js 16, TypeScript, and Tailwind CSS. Help users make smarter financial decisions with beautiful, interactive tools.

## 🚀 Live Demo

Visit the live site: [financialcalculators.com](https://financialcalculators.com)

## ✨ Features

### 📊 6 Powerful Calculators

1. **Retirement Calculator** - Plan retirement savings with compound growth projections
2. **Mortgage Calculator** - Calculate home loan payments with taxes, insurance, and PMI
3. **Tax Calculator** - Estimate 2025 federal income tax and take-home pay
4. **Compound Interest Calculator** - See how investments grow over time
5. **Loan Calculator** - Calculate EMI with detailed amortization schedule
6. **SIP Calculator** - Plan systematic investments with projected returns

### 🎯 User Features

- ✅ Interactive charts and visualizations (Recharts)
- ✅ Share results on social media
- ✅ Export calculations (PDF/JSON)
- ✅ Real-time validation with Zod schemas
- ✅ Responsive design with dark mode
- ✅ Mobile-first PWA ready

### 🔍 SEO & Marketing Features

- ✅ Schema.org structured data on all pages
- ✅ Comprehensive meta tags and Open Graph
- ✅ Automatic sitemap.xml generation
- ✅ robots.txt optimization
- ✅ Blog section with SEO-optimized content
- ✅ Mobile-optimized for Core Web Vitals
- ✅ Semantic HTML for accessibility

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
financial-calculators/
├── src/
│   ├── app/
│   │   ├── calculators/
│   │   │   ├── retirement/
│   │   │   ├── mortgage/
│   │   │   ├── tax/
│   │   │   ├── compound-interest/
│   │   │   ├── loan/
│   │   │   └── sip/
│   │   ├── blog/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── calculators/
│   │   ├── shared/
│   │   └── ui/
│   └── lib/
│       └── calculations/
│           ├── retirement.ts
│           ├── mortgage.ts
│           ├── tax.ts
│           ├── compound-interest.ts
│           ├── loan.ts
│           └── sip.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/financial-calculators.git

# Navigate to project directory
cd financial-calculators

# Install dependencies
npm install

# Create .env.local file for analytics and ads
cp .env.local.example .env.local

# Add your Google Analytics and AdSense IDs to .env.local
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Google Analytics & AdSense Setup

### Google Analytics Setup

1. **Create Google Analytics Account**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new property (GA4)
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to Environment Variables**
   ```bash
   # .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Tracking Events**
   The app automatically tracks:
   - Page views
   - Calculator usage (each calculation performed)
   - Share button clicks
   - Export actions
   - Calculator opens

4. **Custom Event Tracking**
   ```typescript
   import { trackCalculation, trackShare } from '@/lib/analytics';
   
   // Track a calculation
   trackCalculation('retirement', { age: 30, targetAmount: 1000000 });
   
   // Track a share
   trackShare('mortgage', 'twitter');
   ```

### Google AdSense Setup

1. **Apply for AdSense**
   - Go to [Google AdSense](https://www.google.com/adsense)
   - Sign up and get approved (requires quality content)
   - Get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

2. **Add to Environment Variables**
   ```bash
   # .env.local
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

3. **Create Ad Units**
   - In AdSense dashboard, create ad units
   - Get the ad slot IDs
   - Add them to your calculator pages

4. **Place Ads in Calculators**
   ```tsx
   import AdUnit from '@/components/ads/AdUnit';
   
   <AdUnit 
     adSlot="1234567890" 
     adFormat="rectangle"
     className="my-4"
   />
   ```

### Ad Placement Recommendations

- **Above the fold**: Horizontal banner (728x90 or responsive)
- **Sidebar**: Skyscraper (160x600) or medium rectangle (300x250)
- **Between results**: Responsive rectangle after calculation results
- **Footer**: Horizontal banner or responsive unit

**Important**: Don't overdo ads - maintain good user experience for better engagement and SEO.

## 📈 SEO Optimization

This project is built with SEO best practices:

- **Structured Data**: All calculator pages include Schema.org JSON-LD
- **Meta Tags**: Comprehensive title, description, and keywords for each page
- **Open Graph**: Social media sharing optimization
- **Sitemap**: Auto-generated XML sitemap for search engines
- **Robots.txt**: Proper crawling instructions
- **Mobile-First**: Responsive design for all devices
- **Performance**: Optimized for Core Web Vitals

## 📝 Blog Content

The blog section includes SEO-optimized articles:

- Retirement planning guides
- Mortgage and home-buying tips
- Tax optimization strategies
- Investment education
- Calculator tutorials

## 🎨 Customization

### Adding New Calculators

1. Create calculation logic in `src/lib/calculations/`
2. Create calculator component in `src/components/calculators/`
3. Create page in `src/app/calculators/[name]/page.tsx`
4. Add to home page calculator grid
5. Update sitemap.ts

### Styling

Customize theme in `tailwind.config.ts` and global styles in `src/app/globals.css`.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production

```bash
npm run build
npm run start
```

## 📊 Traffic & Marketing Recommendations

1. **Content Marketing**
   - Publish weekly blog posts
   - Create comparison articles ("Best Mortgage Calculator 2025")
   - Answer common financial questions

2. **Social Media**
   - Share calculator results on Twitter/LinkedIn
   - Create infographics from blog content
   - Engage in personal finance communities

3. **SEO**
   - Submit sitemap to Google Search Console
   - Build backlinks from finance websites
   - Target long-tail keywords

4. **Email Marketing**
   - Newsletter signup for financial tips
   - Email calculator results to users
   - Weekly digest of blog posts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Charts by [Recharts](https://recharts.org/)

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for better financial planning**
# Trigger deployment
