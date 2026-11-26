<div align="center">

<a href="https://orbitscroll.vercel.app"><img src="docs/demo.gif" alt="orbit-scroll demo: cards rotate around a dial as the page scrolls" width="640" /></a>

# orbit-scroll

A scroll-driven orbit carousel for React.<br />
Cards travel around a ticked dial as you scroll, and a spring swings the active one into place.

[![Live demo](https://img.shields.io/badge/demo-orbitscroll.vercel.app-1B2140?style=flat-square&logo=vercel&logoColor=white)](https://orbitscroll.vercel.app)
[![shadcn registry](https://img.shields.io/badge/shadcn-registry-2F54EB?style=flat-square)](#install)
[![Framer Motion](https://img.shields.io/badge/framer--motion-11%2B-A24BC0?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)
[![License: MIT](https://img.shields.io/github/license/mesubash/orbit-scroll?style=flat-square&color=0F9D8A)](LICENSE)

[Live demo](https://orbitscroll.vercel.app) · [Install](#install) · [Usage](#usage) · [Props](#props)

</div>

## Features

- **One file.** Copy it in or install it with the shadcn CLI. No package to depend on.
- **Any number of items.** Each one gets its own color, icon and slice of the scroll.
- **Always lands on a card.** Scroll picks the item, a spring does the motion, so the dial never rests halfway.
- **Clickable steps.** A tick under the text jumps to any item.
- **Works on phones.** The dial moves below the text on small screens.
- **Respects reduced motion.** No spring, blur or fades when the visitor asks for less motion.
- **Inherits your styles.** Text color and font come from the page.

## Install

With the [shadcn CLI](https://ui.shadcn.com/docs/cli):

```sh
npx shadcn@latest add https://orbitscroll.vercel.app/r/orbit-scroll.json
```

Or by hand: copy [`src/components/OrbitScroll.tsx`](src/components/OrbitScroll.tsx) into your project and install Framer Motion.

```sh
npm install framer-motion
```

**Requires** React 18+, Framer Motion 11+ and Tailwind CSS 3.4+ or 4.

## Usage

```tsx
import { OrbitScroll } from "@/components/OrbitScroll";
import { PenTool, Search } from "lucide-react";

export function Process() {
  return (
    <OrbitScroll
      eyebrow="How a feature ships"
      items={[
        {
          title: "Research",
          description: "Talk to people first.",
          color: "#2F54EB",
          icon: <Search />,
        },
        {
          title: "Sketch",
          description: "Fast, rough, disposable.",
          color: "#0F9D8A",
          icon: <PenTool />,
        },
      ]}
    />
  );
}
```

Icons are any React node. The demo uses [lucide-react](https://lucide.dev), but nothing depends on it.

## Props

| Prop      | Type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| `items`   | `OrbitItem[]` | The cards, in order                        |
| `eyebrow` | `string`      | Optional line shown above the active title |
| `id`      | `string`      | Optional section id, so you can link to it |

```ts
type OrbitItem = {
  title: string;
  description: string;
  color: string; // any CSS color
  icon?: React.ReactNode;
};
```

## How it works

The section is `(items + 1) × 100vh` tall with a sticky stage inside. Each item owns an
equal slice of that scroll. The cards sit on a circle centered on the right edge of the
viewport, so the off-screen half hides itself, and the card at 9 o'clock is the active one.
Sizes use a viewport-based unit, so the dial always fits its half of the screen.

## Run the demo locally

```sh
git clone https://github.com/mesubash/orbit-scroll.git
cd orbit-scroll
bun install
bun dev        # http://localhost:8080
```

After editing the component, run `bun run registry:build` to refresh the files in `public/r/`.

## License

[MIT](LICENSE) © [Subash Singh Dhami](https://github.com/mesubash)
