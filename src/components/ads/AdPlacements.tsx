import AdUnit from './AdUnit';

export default function AdPlacements() {
  return {
    // Header leaderboard ad (desktop)
    HeaderAd: () => (
      <AdUnit
        adSlot="1234567890"
        adFormat="horizontal"
        className="my-4 hidden md:block"
      />
    ),

    // Sidebar ad (desktop)
    SidebarAd: () => (
      <AdUnit
        adSlot="0987654321"
        adFormat="rectangle"
        className="sticky top-4 hidden lg:block"
      />
    ),

    // In-content ad (mobile & desktop)
    InContentAd: () => (
      <AdUnit adSlot="1122334455" adFormat="auto" className="my-6" />
    ),

    // Mobile banner (mobile only)
    MobileBannerAd: () => (
      <AdUnit
        adSlot="5544332211"
        adFormat="auto"
        className="my-4 md:hidden"
      />
    ),

    // Footer ad
    FooterAd: () => (
      <AdUnit adSlot="9988776655" adFormat="horizontal" className="my-6" />
    ),
  };
}
