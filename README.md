# Cashy Design System

A modern, accessible design system built with React, TypeScript, and Storybook. Features a comprehensive component library with full dark mode support, automated testing, and design tokens extracted from Figma.

[![Chromatic](https://img.shields.io/badge/Chromatic-Visual%20Tests-orange)](https://www.chromatic.com/builds?appId=698055c1632cefdfc2bc2224)
[![Tests](https://github.com/SarvarthDevelopers/cashy-design-system/actions/workflows/test.yml/badge.svg)](https://github.com/SarvarthDevelopers/cashy-design-system/actions/workflows/test.yml)

## 🎨 Features

- **Design Tokens**: CSS custom properties generated from Figma variables
- **Dark Mode**: Full theme support with seamless light/dark switching
- **Accessible**: WCAG compliant components with automated A11y testing
- **Type-Safe**: Built with TypeScript for better developer experience
- **Tested**: Unit tests (Vitest) + Visual regression (Chromatic) + A11y tests
- **Documented**: Interactive documentation powered by Storybook
- **CI/CD**: Automated testing and deployment on every commit
- **Modern Stack**: React 18, Vite 6, and latest tooling

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
# Start Storybook
npm run storybook

# Run tests in watch mode
npm test

# Start Vite dev server
npm run dev
```

### Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run visual regression tests
npm run chromatic
```

### Build

```bash
# Build Storybook
npm run build-storybook

# Build library
npm run build
```

## 📦 Components

### Button
A versatile button component with multiple variants and states.

**Variants:**
- `primary` - Main call-to-action
- `secondary` - Alternative actions
- `tertiary` - Low-emphasis actions
- `danger-bold` - Destructive actions (high emphasis)
- `danger-subtle` - Destructive actions (low emphasis)

**Features:**
- Icon support (left/right)
- Loading states
- Disabled states
- Icon-only mode
- Three sizes (small, medium, large)
- Full accessibility support

## 🧪 Testing

This project uses a comprehensive testing strategy:

- **Unit Tests**: Vitest + Testing Library for component logic
- **Accessibility Tests**: Automated A11y checks in Storybook
- **Visual Regression**: Chromatic for UI consistency

See [TESTING.md](./TESTING.md) for detailed testing guide.

## 🎨 Design Tokens

Design tokens are automatically generated from Figma and include:

- **Colors**: Semantic color system with light/dark modes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Radii**: Border radius values

Tokens are available as CSS custom properties in `src/tokens/variables.css`.

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 6** - Build tool
- **Storybook 8** - Component documentation
- **Vitest** - Unit testing
- **Testing Library** - Component testing utilities
- **Chromatic** - Visual regression testing
- **CSS Custom Properties** - Theming system

## 📖 Documentation

Visit the live Storybook to explore all components interactively:

**🔗 [Live Storybook](https://cashy-design-system.vercel.app)** (Deployed on Vercel)

Or run locally:
```bash
npm run storybook
```

## 🚀 Deployment

- **Storybook**: Automatically deployed to Vercel on every push to `main`
- **Chromatic**: Visual tests run on every commit and PR
- **Tests**: Unit tests run via GitHub Actions on every push

## 🤝 Contributing

This is a design system for the Cashy project. When contributing:

1. Follow the established component patterns
2. Use design tokens for all styling
3. Write unit tests for new components
4. Ensure accessibility compliance
5. Add Storybook stories and documentation

See [TESTING.md](./TESTING.md) for testing guidelines.

## 📄 License

MIT

## 🔗 Links

- [Figma Design File](https://www.figma.com/design/SgNdO2YmHiOGzsGwy1ZHWN/CASHY-Design-System-Kit?m=auto&t=K7jNbq3AZI8HV9s9-1) - Design source
- [Storybook (Live)](https://cashy-design-system.vercel.app) - Component documentation
- [Chromatic](https://www.chromatic.com/builds?appId=698055c1632cefdfc2bc2224) - Visual tests
- [GitHub Actions](https://github.com/SarvarthDevelopers/cashy-design-system/actions) - CI/CD

---

Built with ❤️ by [SarvarthDevelopers](https://github.com/SarvarthDevelopers)
