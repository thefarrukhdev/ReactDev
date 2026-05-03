# 📁 Professional Folder Structure

## ✅ Yangi Tuzilma

```
src/
├── app/                                    # Next.js App Router
│   ├── (marketing)/                       # Route group - marketing pages
│   │   └── page.tsx                       # Landing page (/)
│   ├── components/                        # Components showcase (/components)
│   │   ├── [slug]/                        # Dynamic route (future)
│   │   ├── layout.tsx                     # Components layout
│   │   └── page.tsx                       # Components list page
│   ├── layout.tsx                         # Root layout
│   └── ...
│
├── components/
│   ├── ui/                                # ✨ Reusable UI Component Library
│   │   ├── button/
│   │   │   ├── index.ts                   # Barrel export
│   │   │   ├── button.tsx                 # Main component
│   │   │   ├── button-code.ts             # Code string
│   │   │   ├── meta.tsx                   # Component metadata
│   │   │   ├── usage.ts                   # Usage example
│   │   │   ├── install.ts                 # Install instructions
│   │   │   └── README.md                  # Documentation
│   │   ├── card/
│   │   │   ├── index.ts
│   │   │   ├── ImageCard.tsx
│   │   │   └── ...
│   │   ├── carousel/
│   │   │   ├── index.ts
│   │   │   ├── Glass3DCarousel.tsx
│   │   │   └── ...
│   │   └── index.ts                       # Main UI exports
│   │
│   ├── layout/                            # 🏗️ Layout Components
│   │   ├── navbar/
│   │   │   ├── index.ts
│   │   │   ├── navbar.tsx
│   │   │   ├── NavbarActions.tsx
│   │   │   ├── NavbarLogo.tsx
│   │   │   ├── NavbarSearch.tsx
│   │   │   └── NavbarUtils.tsx
│   │   ├── sidebar/
│   │   │   ├── index.ts
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarEmpty.tsx
│   │   │   ├── SidebarHeader.tsx
│   │   │   └── SidebarItem.tsx
│   │   └── footer/
│   │       ├── index.ts
│   │       └── footer.tsx
│   │
│   ├── features/                          # 🎯 Feature-specific Components
│   │   ├── component-preview/
│   │   │   ├── index.ts
│   │   │   ├── component-preview.tsx
│   │   │   └── types.tsx
│   │   └── code-block/                    # (future)
│   │
│   └── shared/                            # 🔧 Shared Utility Components
│       ├── buttons/
│       │   ├── index.ts
│       │   ├── LiquidButton.tsx
│       │   ├── LiquidGlassButton.tsx
│       │   ├── NeonButton.tsx
│       │   └── GoToMainButton.tsx
│       ├── window-header/
│       │   ├── index.ts
│       │   └── window-header.tsx
│       ├── background/
│       │   └── background.tsx
│       ├── Features.tsx
│       └── Tabs.tsx
│
├── lib/
│   ├── utils/                             # 🛠️ Utility Functions
│   │   ├── index.ts
│   │   └── cn.ts                          # Class name utility
│   ├── hooks/                             # 🪝 Custom React Hooks
│   │   ├── index.ts
│   │   └── use-copy-to-clipboard.ts
│   └── constants/                         # 📋 Constants
│       ├── index.ts
│       └── components.ts                  # Component registry
│
├── types/                                 # 📝 TypeScript Types
│   ├── index.ts
│   └── component.ts
│
├── config/                                # ⚙️ Configuration
│   └── site.ts                            # Site config
│
├── data/                                  # 📊 Static Data
│   └── sampleCards.tsx
│
└── styles/                                # 🎨 Global Styles
    └── globals.css
```

## 🎯 Asosiy O'zgarishlar

### 1. **Component Organization**
- ✅ `ui/` - Reusable component library (export qilish mumkin)
- ✅ `layout/` - App-specific layout components
- ✅ `features/` - Feature-specific components
- ✅ `shared/` - Shared utility components

### 2. **Naming Conventions**
- ✅ Lowercase folder names (`button`, `card`, `carousel`)
- ✅ PascalCase component files (`Button.tsx`, `ImageCard.tsx`)
- ✅ Kebab-case utility files (`button-code.ts`, `component-preview.tsx`)
- ✅ Barrel exports (`index.ts`) in every folder

### 3. **Import Paths**
```typescript
// ❌ Eski
import { NeoGlassButton } from "@/components/ui/Button/NeoglassButton";
import Navbar from "@/components/Navbar/page";
import { componentsList } from "@/lib/componentsList";

// ✅ Yangi
import { NeoGlassButton } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import { componentsList } from "@/lib/constants";
```

### 4. **App Router Structure**
- ✅ Route groups: `(marketing)/` for landing page
- ✅ Proper naming: `components/` instead of `Components/`
- ✅ Dynamic routes ready: `[slug]/` for future expansion

### 5. **Utility Organization**
- ✅ `lib/utils/` - Pure utility functions
- ✅ `lib/hooks/` - Custom React hooks
- ✅ `lib/constants/` - Constants and registries
- ✅ `config/` - App configuration

## 📚 Benefits

### Scalability
- Easy to add new components
- Clear separation of concerns
- Modular architecture

### Maintainability
- Consistent naming conventions
- Predictable file locations
- Self-documenting structure

### Developer Experience
- Intuitive folder hierarchy
- Easy to navigate
- Clear import paths

### Reusability
- UI components can be extracted to npm package
- Shared utilities are centralized
- Easy to copy components to other projects

## 🚀 Next Steps

### Immediate
1. ✅ Folder structure refactored
2. ✅ Imports updated
3. ✅ Build successful
4. ✅ Documentation created

### Short-term
1. Add tests for each component
2. Add Storybook for component development
3. Create component documentation
4. Add ESLint/Prettier configuration

### Long-term
1. Extract UI library to separate package
2. Add more components
3. Create documentation website
4. Publish to npm

## 📖 Usage Examples

### Importing UI Components
```typescript
// Single component
import { NeoGlassButton } from "@/components/ui/button";

// Multiple components
import { NeoGlassButton } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/card";
import { Glass3DCarousel } from "@/components/ui/carousel";

// All UI components
import * as UI from "@/components/ui";
```

### Importing Layout Components
```typescript
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
```

### Importing Utilities
```typescript
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/hooks";
import { componentsList } from "@/lib/constants";
```

## 🎨 Component Structure Template

Har bir yangi komponent uchun:

```
component-name/
├── index.ts              # export { ComponentName } from "./component-name";
├── component-name.tsx    # Main component
├── component-name.test.tsx  # Tests (future)
├── component-name.stories.tsx  # Storybook (future)
├── types.ts              # Component-specific types (if needed)
└── README.md             # Component documentation
```

## ✅ Checklist

- [x] Folder structure refactored
- [x] All files moved to new locations
- [x] Import paths updated
- [x] Barrel exports created
- [x] Build successful
- [x] Documentation created
- [ ] Tests added
- [ ] Storybook configured
- [ ] Component READMEs completed
- [ ] CI/CD pipeline setup

---

**Status:** ✅ Refactoring Complete - Build Successful!
