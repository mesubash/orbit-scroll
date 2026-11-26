# orbit-scroll

A scroll-driven orbit carousel for React. Cards travel around a ticked dial as you
scroll; the active one swings into place with a spring.

**[Live demo](https://orbitscroll.vercel.app)**

![orbit-scroll demo](docs/demo.gif)

- One file: [`src/components/OrbitScroll.tsx`](src/components/OrbitScroll.tsx)
- Needs `react`, `framer-motion` and Tailwind CSS
- Any number of items, clickable step navigation, works on mobile, respects reduced motion

## Install

With the [shadcn CLI](https://ui.shadcn.com/docs/cli):

```sh
npx shadcn@latest add https://orbitscroll.vercel.app/r/orbit-scroll.json
```

Or copy `src/components/OrbitScroll.tsx` into your project and run `npm install framer-motion`.

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

| Prop      | Type          | Description                                          |
| --------- | ------------- | ---------------------------------------------------- |
| `items`   | `OrbitItem[]` | `{ title, description, color, icon? }` for each card |
| `eyebrow` | `string`      | Optional line shown above the active title           |
| `id`      | `string`      | Optional section id, so you can link to it           |

The section is `(items + 1) × 100vh` tall and each item gets an equal slice of the scroll.
Text color and font are inherited from the page.

## Run the demo

```sh
bun install
bun dev        # http://localhost:8080
```

After editing the component, run `bun run registry:build` to refresh `public/r/`.

## License

MIT © [Subash Singh Dhami](https://github.com/mesubash)
