# Impara News - Component Backup & Documentation

## Current Setup (Working Configuration)

### How Header & Footer Work Now:

The Header and Footer are **automatically included on ALL pages** through the `Layout.tsx` component.

**File: `src/components/Layout.tsx`**
- Wraps all pages in App.tsx
- Automatically adds Header at the top
- Automatically adds Footer at the bottom
- Adds proper spacing (pt-16) for fixed header

### File Structure:

```
src/
├── components/
│   ├── Header.tsx          ✅ Green theme, responsive, animations
│   ├── Footer.tsx          ✅ Dark theme with green accents
│   ├── Layout.tsx          ✅ Wraps all pages with Header/Footer
│   ├── RotatingAd.tsx      ✅ Auto-rotating 3-second ads
│   └── CategoryPage.tsx    ✅ Reusable template for category pages
├── pages/
│   ├── HomePage.tsx        ✅ Green theme with rotating ads
│   ├── Sports.tsx          ✅ Sports news page
│   ├── Politics.tsx        ✅ Politics news page
│   ├── Economics.tsx       ✅ Economics news page
│   ├── Health.tsx          ✅ Health news page
│   └── Entertainment.tsx   ✅ Entertainment news page
└── App.tsx                 ✅ Routes wrapped in Layout
```

## Key Features:

### 1. Header Component
- **Location**: `src/components/Header.tsx`
- **Theme**: Green gradient (`from-green-600 to-green-500`)
- **Features**:
  - Fixed position at top
  - Responsive mobile menu
  - Search functionality
  - Dark mode toggle
  - Navigation links with icons
  - White "Sign In" button

### 2. Footer Component
- **Location**: `src/components/Footer.tsx`
- **Theme**: Dark gray with green accents
- **Features**:
  - Social media links
  - Newsletter subscription
  - Contact information
  - Quick links
  - Scroll-to-top button

### 3. Rotating Advertisement
- **Location**: `src/components/RotatingAd.tsx`
- **Features**:
  - Auto-rotates every 3 seconds
  - 3 different ads with images
  - Manual navigation arrows
  - Dot indicators
  - Smooth animations

### 4. Layout Component
- **Location**: `src/components/Layout.tsx`
- **Purpose**: Wraps all pages with Header and Footer
- **Usage**: Already configured in App.tsx

## How to Modify:

### To Change Header/Footer on Specific Pages:

If you want to hide Header/Footer on specific pages, modify `Layout.tsx`:

```tsx
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/some-page';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};
```

### To Add More Ads to Rotating Banner:

Edit `src/components/RotatingAd.tsx` and add to the `ads` array:

```tsx
const ads: AdItem[] = [
  {
    id: "4",
    title: "Your Ad Title",
    description: "Your ad description",
    image: "/path/to/image.jpg",
    bgColor: "from-blue-500 to-blue-600",
    link: "https://your-link.com"
  },
  // ... existing ads
];
```

### To Change Ad Rotation Speed:

In `RotatingAd.tsx`, change the interval (currently 3000ms = 3 seconds):

```tsx
const timer = setInterval(() => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
}, 3000); // Change this number (in milliseconds)
```

## Color Scheme:

- **Primary Green**: `#16a34a` (green-600)
- **Secondary Green**: `#22c55e` (green-500)
- **Dark Background**: `#1f2937` (gray-800)
- **Light Background**: `#f9fafb` (gray-50)
- **Accent Colors**: Orange, Amber, Red for ads

## Responsive Breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive and work on all screen sizes.

## Notes:

1. Header and Footer are **always visible** on all pages
2. The Layout component handles this automatically
3. No need to import Header/Footer in individual pages
4. All pages use the same green theme
5. Advertisements rotate automatically every 3 seconds

---

**Last Updated**: October 25, 2025
**Version**: 1.0
**Status**: ✅ All components working correctly
