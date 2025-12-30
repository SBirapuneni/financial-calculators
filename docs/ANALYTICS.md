# Google Analytics Tracking Guide

## Overview

This application now tracks detailed analytics for each calculator including:
- **Calculator visits** - Which calculator was opened
- **Time spent** - How long users spend on each calculator
- **Engagement metrics** - Number of calculations performed
- **Input interactions** - When users change input values

## How It Works

### 1. Automatic Page Tracking

Each calculator page is wrapped with `CalculatorPageWrapper` which automatically tracks:
- When user visits the page
- How long they stay (minimum 5 seconds to avoid bounces)
- When they switch tabs or leave

### 2. Events Tracked

#### Page View Events
```javascript
calculator_opened: {
  calculator_name: 'retirement',
  page_path: '/calculators/retirement',
  timestamp: '2025-12-19T10:30:00.000Z'
}
```

#### Time Spent Events
```javascript
calculator_time_spent: {
  calculator_name: 'retirement',
  time_seconds: 120,
  time_minutes: 2.0,
  page_path: '/calculators/retirement'
}
```

#### Calculation Events
```javascript
calculation_performed: {
  calculator_name: 'retirement',
  calculation_number: 1,
  timestamp: '2025-12-19T10:30:00.000Z',
  // Custom data specific to calculator
}
```

## Adding Analytics to a Calculator Page

### Step 1: Import the Wrapper

```tsx
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';
```

### Step 2: Wrap Your Page Content

```tsx
export default function MyCalculatorPage() {
  return (
    <CalculatorPageWrapper calculatorName="my-calculator">
      {/* Your calculator content */}
    </CalculatorPageWrapper>
  );
}
```

### Step 3: Track Calculations (Optional)

If you want to track when users perform calculations, use the hook directly in your calculator component:

```tsx
'use client';

import { useCalculatorAnalytics } from '@/hooks/useCalculatorAnalytics';

export default function MyCalculator() {
  const { trackCalculation } = useCalculatorAnalytics({
    calculatorName: 'my-calculator',
    trackTimeSpent: true,
  });

  const handleCalculate = (data: any) => {
    // Your calculation logic
    const result = calculateSomething(data);

    // Track the calculation
    trackCalculation({
      input_amount: data.amount,
      input_rate: data.rate,
      result_value: result,
    });

    return result;
  };

  return (
    // Your calculator UI
  );
}
```

## Viewing Analytics Data

### Google Analytics 4 Dashboard

1. **Realtime View**:
   - GA4 → Reports → Realtime
   - See active users on calculator pages

2. **Events**:
   - GA4 → Reports → Events
   - View all tracked events: `calculator_opened`, `calculator_time_spent`, `calculation_performed`

3. **Custom Reports**:
   Create custom reports to analyze:
   - Most popular calculators
   - Average time spent per calculator
   - Calculator conversion (view → calculation)
   - User engagement patterns

### Key Metrics to Monitor

1. **Calculator Popularity**:
   - Event: `calculator_opened`
   - Dimension: `calculator_name`
   - Shows which calculators are most visited

2. **User Engagement**:
   - Event: `calculator_time_spent`
   - Metric: Average `time_seconds`
   - Shows how engaging each calculator is

3. **Calculation Rate**:
   - Event: `calculation_performed`
   - Metric: Count per `calculator_name`
   - Shows how often users actually calculate

4. **Bounce Rate**:
   - Users who leave before 5 seconds aren't tracked
   - Compare page views vs calculator_opened events

## Calculator-Specific Tracking

### Current Implementation Status

✅ **Implemented** (with automatic tracking):
- Retirement Calculator
- EMI Calculator

⚪ **To be implemented** (needs wrapper added):
- Mortgage Calculator
- Tax Calculator
- Compound Interest Calculator
- Loan Calculator
- SIP Calculator
- Loan Payoff Calculator
- APR to APY Calculator
- Fixed Deposit Calculator

### Adding to Remaining Calculators

For each calculator in `src/app/calculators/*/page.tsx`:

1. **Add import**:
   ```tsx
   import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';
   ```

2. **Wrap the return statement**:
   ```tsx
   return (
     <CalculatorPageWrapper calculatorName="calculator-slug">
       {/* existing content */}
     </CalculatorPageWrapper>
   );
   ```

## Custom Event Tracking

### Track Input Changes

```tsx
const { trackInputChange } = useCalculatorAnalytics({
  calculatorName: 'my-calculator',
});

<input
  onChange={(e) => {
    trackInputChange('amount', e.target.value);
  }}
/>
```

### Track Share Actions

```tsx
import { trackShare } from '@/lib/analytics';

const handleShare = (platform: string) => {
  trackShare('retirement', platform); // 'twitter', 'facebook', 'linkedin'
};
```

### Track Print Actions

```tsx
import { trackPrint } from '@/lib/analytics';

const handlePrint = () => {
  trackPrint('retirement');
};
```

## Debugging

### Check if Analytics is Working

1. **Browser Console**:
   ```javascript
   // Check if gtag is loaded
   console.log(typeof window.gtag);  // Should be 'function'
   
   // Check dataLayer
   console.log(window.dataLayer);  // Should show array of events
   ```

2. **Network Tab**:
   - Open DevTools → Network
   - Filter: "google-analytics" or "gtag"
   - Should see requests to `www.googletagmanager.com`

3. **GA4 DebugView**:
   - Enable debug mode: `gtag('config', 'G-JVHMR8RYRY', { debug_mode: true })`
   - GA4 → Configure → DebugView
   - See events in real-time

### Common Issues

1. **No events tracked**:
   - Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
   - Verify GA script is loaded (`window.gtag` exists)
   - Check browser has JavaScript enabled
   - Disable ad blockers for testing

2. **Time not tracked**:
   - User must stay at least 5 seconds (configurable)
   - Page must be visible (not background tab)
   - Check browser visibility API support

3. **Events not in GA4**:
   - Events take 24-48 hours to appear in standard reports
   - Use Realtime view for immediate verification
   - Check event names match GA4 conventions (lowercase, underscores)

## Best Practices

1. **Event Naming**:
   - Use lowercase with underscores
   - Be specific but concise
   - Group related events with prefixes

2. **Event Parameters**:
   - Keep parameter names consistent
   - Don't send PII (personally identifiable information)
   - Limit parameter values to reasonable lengths

3. **Performance**:
   - Analytics runs asynchronously
   - Minimal impact on page load
   - Events are batched and sent periodically

4. **Privacy**:
   - No PII in event parameters
   - Respect user's Do Not Track settings
   - Comply with GDPR/CCPA regulations
   - Add cookie consent banner if required

## Testing Analytics

### Local Testing

```bash
# Start development server
npm run dev

# Open calculator page
# Open browser console
# Check for gtag events
window.dataLayer  // Should show events
```

### Production Testing

```bash
# Deploy to production
./deploy.sh deploy

# Visit calculator
# Check GA4 Realtime view
# Should see active user and events
```

## Analytics API Reference

See `/src/lib/analytics.ts` for all available tracking functions:
- `trackEvent(name, params)` - Generic event tracking
- `trackCalculatorView(name)` - Track page view
- `trackTimeSpent(name, seconds)` - Track time
- `trackCalculation(name, data)` - Track calculation
- `trackShare(name, method)` - Track sharing
- `trackPrint(name)` - Track printing

See `/src/hooks/useCalculatorAnalytics.ts` for the React hook.

---

**Last Updated**: December 19, 2025
