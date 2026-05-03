# 🏗️ Folder Structure Refactoring Plan

## Current Issues
1. ❌ `src/app/Components/` - Next.js convention buzilgan (capital C)
2. ❌ Mixed component types in one folder
3. ❌ No clear separation between UI library and app components
4. ❌ Missing utility folders (hooks, constants, config)
5. ❌ Inconsistent naming (page.tsx in components folder)
6. ❌ No test files structure
7. ❌ Missing documentation structure

## New Professional Structure

### Phase 1: Core Restructuring ✅
```
src/
├── components/
│   ├── ui/              # Exportable component library
│   ├── layout/          # App layout components
│   ├── features/        # Feature-specific components
│   └── shared/          # Shared utilities
├── lib/
│   ├── utils/
│   ├── hooks/
│   └── constants/
├── config/
└── types/
```

### Phase 2: Component Organization
- Each UI component gets its own folder with:
  - index.ts (barrel export)
  - component.tsx
  - component.test.tsx
  - component.stories.tsx (optional)
  - README.md
  - types.ts (if needed)

### Phase 3: App Router Optimization
- Use route groups for better organization
- Dynamic routes for component pages
- Proper layout hierarchy

## Migration Steps
1. Create new folder structure
2. Move files to appropriate locations
3. Update all imports
4. Add barrel exports (index.ts)
5. Verify build works
6. Update documentation

## Benefits
✅ Clear separation of concerns
✅ Easier to find files
✅ Better scalability
✅ Industry standard structure
✅ Easier onboarding for new developers
✅ Ready for component library extraction
