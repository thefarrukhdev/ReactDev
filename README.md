# 🎨 React UI Component Library

A curated collection of beautiful, reusable, and production-ready React components built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 **Modern Stack**: Next.js 15, React 19, TypeScript
- 🎨 **Beautiful Design**: Glassmorphism, animations, and modern UI patterns
- 📦 **Modular**: Each component is self-contained and reusable
- ♿ **Accessible**: Built with accessibility in mind
- 📱 **Responsive**: Works seamlessly on all devices
- 🎭 **Animated**: Smooth transitions with Framer Motion
- 🔧 **Customizable**: Easy to customize and extend

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Landing page
│   ├── components/              # Component showcase
│   ├── layout.tsx               # Root layout
│   └── ...
│
├── components/
│   ├── ui/                      # Reusable UI components (library)
│   │   ├── button/             # Button components
│   │   ├── card/               # Card components
│   │   └── carousel/           # Carousel components
│   │
│   ├── layout/                  # Layout components
│   │   ├── navbar/             # Navigation bar
│   │   ├── sidebar/            # Sidebar navigation
│   │   └── footer/             # Footer
│   │
│   ├── features/                # Feature-specific components
│   │   └── component-preview/  # Component preview system
│   │
│   └── shared/                  # Shared utility components
│       ├── buttons/            # Utility buttons
│       └── window-header/      # Window header component
│
├── lib/
│   ├── utils/                   # Utility functions
│   ├── hooks/                   # Custom React hooks
│   └── constants/               # Constants and configs
│
├── types/                       # TypeScript type definitions
├── config/                      # App configuration
└── styles/                      # Global styles
```

## 🎯 Available Components

### Buttons
- **NeoGlass Button**: Glassmorphism button with multiple variants
  - Variants: primary, secondary, danger, ghost
  - Sizes: sm, md, lg
  - Features: loading state, icons, animations

### Cards
- **Image Card**: Beautiful card component with image support

### Carousels
- **Glass 3D Carousel**: 3D carousel with glassmorphism effect

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Highlighting**: [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)

## 📝 Usage Example

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

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📚 Documentation

Each component has its own README with:
- Usage examples
- Props documentation
- Customization guide
- Accessibility notes

Check the component folders in `src/components/ui/` for detailed documentation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern UI/UX trends
- Built with love using Next.js and React
- Special thanks to the open-source community

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/your-repo](https://github.com/yourusername/your-repo)

---

Made with ❤️ and ☕
