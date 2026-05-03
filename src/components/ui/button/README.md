# NeoGlass Button

A beautiful glassmorphism button component with multiple variants and sizes.

## Features

- 🎨 Multiple variants (primary, secondary, danger, ghost)
- 📏 Three sizes (sm, md, lg)
- ⚡ Loading state support
- 🎯 Icon support (left/right)
- ♿ Accessible and keyboard-friendly
- 🎭 Smooth animations and transitions

## Usage

```tsx
import { NeoGlassButton } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Example() {
  return (
    <NeoGlassButton 
      variant="primary" 
      size="md"
      leftIcon={<Download />}
    >
      Download
    </NeoGlassButton>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"primary" \| "secondary" \| "danger" \| "ghost"` | `"primary"` | Button style variant |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| loading | `boolean` | `false` | Show loading spinner |
| leftIcon | `React.ReactNode` | - | Icon on the left side |
| rightIcon | `React.ReactNode` | - | Icon on the right side |
| disabled | `boolean` | `false` | Disable button |
| className | `string` | - | Additional CSS classes |

## Examples

### With Loading State
```tsx
<NeoGlassButton loading>
  Processing...
</NeoGlassButton>
```

### With Icons
```tsx
<NeoGlassButton 
  leftIcon={<Download />}
  rightIcon={<ArrowRight />}
>
  Continue
</NeoGlassButton>
```

### Variants
```tsx
<NeoGlassButton variant="primary">Primary</NeoGlassButton>
<NeoGlassButton variant="secondary">Secondary</NeoGlassButton>
<NeoGlassButton variant="danger">Danger</NeoGlassButton>
<NeoGlassButton variant="ghost">Ghost</NeoGlassButton>
```
