---
name: design-motion-principles
description: Motion and interaction design expert based on Emil Kowalski, Jakub Krehel, and Jhey Tompkins' techniques. Two modes - build interactive components with purposeful motion, or audit existing animations to catch AI-slop motion patterns. Use when creating, adding, animating, or reviewing UI motion in React, Motion, CSS, or Tailwind.
---

# Design Motion Principles Skill (Christian Multi Store Edition)

Expert motion and interaction design framework combining the distinct philosophies of three industry-leading designers:

- **Emil Kowalski** (Linear, ex-Vercel) - Restraint, speed (<300ms), tactile feedback (`active:scale(0.97)`), frequency gate.
- **Jakub Krehel** (jakub.kr) - Subtle production polish, `opacity + translateY + blur` enters, subtler exits, `bounce: 0` springs.
- **Jhey Tompkins** (@jh3yy) - Creative delight, physics-based micro-interactions, typed transitions.

---

## 1. CORE DIRECTIVES & WORKFLOW MODES

### Mode 1: Create (Build Components with Purposeful Motion)
1. **The Frequency Gate**: Ask "How often will the user trigger this?". High-frequency or keyboard actions get minimal or zero animation.
2. **The Polish Enter/Exit Formula**:
   - Enter: `opacity: 0 -> 1`, `translateY: 8px -> 0`, `filter: blur(4px) -> blur(0px)`.
   - Exit: Subtler than enter (e.g. `translateY: -8px`, `opacity: 0`, `filter: blur(4px)`).
3. **No `scale(0)` Starts**: Always start scale transitions from `scale(0.9)` or `scale(0.95)` for natural physical mass.
4. **Hardware Performance**: Animate strictly `transform`, `opacity`, and `filter`. NEVER animate `width`, `height`, `top`, or `left`.
5. **Accessibility Mandatory**: Always honor `@media (prefers-reduced-motion: reduce)` or `useReducedMotion()` from `motion/react`.

### Mode 2: Audit (Anti-AI-Slop Motion Gate)
- **Flag pulsing indicators** on static UI (remove unmotivated continuous pulse/glow).
- **Flag blur-everywhere entrances** when overused on static body text.
- **Flag bouncy springs on utility actions** (use `bounce: 0` or damped springs `stiffness: 100, damping: 20`).
- **Flag missing exit animations** on modals, drawers, and toasts.

---

## 2. MOTION COOKBOOK (React 19 + motion/react)

### Modal / Dialog Enter & Exit (Jakub + Emil)
```tsx
import { motion, AnimatePresence } from 'motion/react';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(2px)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      {/* Modal Content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Toast Notification Recipe (Emil Sonner-style)
```tsx
<motion.div
  initial={{ opacity: 0, y: 16, scale: 0.95, filter: 'blur(4px)' }}
  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
  exit={{ opacity: 0, y: -8, scale: 0.95, filter: 'blur(2px)' }}
  transition={{ type: 'spring', stiffness: 140, damping: 18 }}
/>
```

### Tactile Press Feedback on Buttons (Emil)
```tsx
<button className="transition-all active:scale-[0.98] cursor-pointer">
  Finalizar Pedido
</button>
```

---

## 3. CHECKLIST PRE-FLIGHT (Motion Quality Gate)

- [ ] Every animated component handles `prefers-reduced-motion`.
- [ ] No `scale(0)` starts (starts from `0.9`+).
- [ ] Exits are subtler than enters.
- [ ] No layout-triggering properties (`width`, `height`, `left`, `top`) are animated.
- [ ] Spring animations use damped physics (`stiffness: 100-140, damping: 18-20, bounce: 0`).
- [ ] No unmotivated continuous pulse loops on static elements.
