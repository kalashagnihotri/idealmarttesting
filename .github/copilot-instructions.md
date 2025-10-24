# Copilot Instructions for IdealMart

## Project Architecture

**IdealMart** is a React + Vite e-commerce application for South Asian grocery stores with price comparison features and gamification. Built with modern stack: React 18, Redux Toolkit, React Router v6, Tailwind CSS, and shadcn/ui components.

### Key Architectural Patterns

- **Redux Features Pattern**: State management follows feature-based slicing in `src/features/` with RTK slices for cart, products, combos, etc.
- **Barrel Exports**: Components use centralized exports via `src/components/index.jsx` and `src/pages/index.jsx`
- **Route-based Layout Exclusions**: `App.jsx` conditionally renders Navbar/Footer based on route patterns (excludes `/register`, `/dashboard`, `/games/*`, `/error/*`)
- **Asset Organization**: Images organized by feature in `src/assets/` with descriptive folder names (`Home-Banner-img/`, `navbar-img/`, etc.)

### Development Workflow

```bash
# Development
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Preview build locally
npm run lint         # ESLint checking

# Firebase deployment
# Build outputs to /dist, configured for idealmart-v2.web.app
```

### Code Conventions

**Import Aliases**: Use `@/` for all src imports (configured in `vite.config.js`):
```jsx
import { Navbar, Footer } from '@/components';
import { ProductsData } from '@/dummy-data/Data.jsx';
```

**Component Structure**: 
- UI components in `src/components/ui/` (shadcn/ui)
- Business components in `src/components/` 
- Page components in `src/pages/`
- Feature logic in `src/features/[feature]/`

**Styling Approach**:
- Custom Tailwind theme with brand colors: `idl-green: #378157`, `idl-yellow: #f8c636`, `idl-red: #e23d21`
- shadcn/ui components with `cn()` utility for class merging
- Responsive design with custom breakpoints like `below-400w-800h`

### Data Models

**Product Structure** (from `dummy-data/Data.jsx`):
```javascript
{
  category: 'Vegetables',
  url: 'image-url',
  name: 'product-name',
  size_options: ["100gm", "500gm"],
  price_range: "$3.00 - $8.00",
  discount: "-77%",
  tag: 'product-description',
  rating: '4.3'
}
```

**Cart State** (Redux):
- Items with quantity, totalPrice per item
- Global totalQuantity and totalPrice
- Uses `discountPrice || price` for calculations

### Special Features

**Price Comparison Calculator**: Persistent floating button component (`PriceCompareCal`) - key differentiator
**Savings Dashboard**: Comprehensive `/savings-and-spent` page with interactive charts (Recharts), real-time API integration, and detailed order history
**Games Integration**: Mini-games in `/games/*` routes (Spin, TicTac, Memory, Quiz) with separate layout
**Firebase Hosting**: SPA setup with rewrites to `/index.html` for client-side routing

### Route Patterns

- Most routes commented out in `AppRouter.jsx` (MVP phase)
- Protected routes use `ProtectedRoute` wrapper
- Games have separate layout without navbar/footer
- Error pages in dedicated `/error/*` structure

### Integration Points

- **Redux Store**: Centralized in `src/redux/store.js` with feature-based reducers
- **API Integration**: Custom hooks pattern in `src/hooks/` for data fetching with sessionStorage token auth
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui with Radix UI primitives
- **Charts & Visualization**: Recharts for interactive dashboards and analytics
- **Icons**: Mix of Lucide React and React Icons
- **Animations**: animate.css + custom Tailwind keyframes

When working on this codebase:
1. Follow the barrel export pattern for new components
2. Use RTK for state management, create feature slices
3. Leverage existing UI components before creating new ones
4. Test route exclusions when adding layout-sensitive pages
5. Maintain the brand color scheme and responsive design patterns
6. Create custom hooks in `src/hooks/` for API calls with proper error handling
7. Use Recharts for data visualization with IdealMart brand colors