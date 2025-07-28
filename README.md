# React + TypeScript + Vite — Modern Landing Page

This project is a dynamic landing page for a prestigious condominium located in the heart of **Rio de Janeiro**. It leverages **React**, **TypeScript**, and **Vite** to deliver a fast, interactive experience with a modern stack.

The page features:
- 🎯 **Parallax scroll effects** that provide a sense of depth and motion
- 🎥 **Animated 3D elements** using Three.js, enhancing immersion
- 📱 **Responsive layout** tailored for both desktop and mobile users
- ⚡️ **Vite HMR** for fast development feedback
- 🎨 **Tailwind CSS** and **Framer Motion** for elegant, animated UI
- 🗺️ **Interactive map**, multimedia sections, and call-to-actions with smooth transitions

> This page is built to showcase a luxury urban lifestyle — highlighting the development's features, location, and amenities through smooth scrolling visuals and interactive components.

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax)
- [Three.js](https://threejs.org/) for 3D elements
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Development

This template provides a minimal setup to get React working in Vite with HMR and basic ESLint rules.

### Recommended ESLint Extensions

If you're developing a production-grade application, we recommend enabling type-aware lint rules:

```ts
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // or stricter:
      // ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
