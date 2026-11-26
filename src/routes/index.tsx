import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Github, Layers, PenTool, Rocket, Search, Sparkles } from "lucide-react";
import { OrbitScroll, type OrbitItem } from "@/components/OrbitScroll";

const TITLE = "orbit-scroll: a scroll-driven orbit carousel for React";
const DESCRIPTION =
  "Cards travel around a dial as you scroll. One React component, built on Framer Motion.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const REPO = "https://github.com/mesubash/orbit-scroll";
const REGISTRY =
  "https://raw.githubusercontent.com/mesubash/orbit-scroll/main/public/r/orbit-scroll.json";
const INK = "#1B2140";
const PAPER = "#ECEEF1";

const ITEMS: OrbitItem[] = [
  {
    title: "Research",
    description: "Talk to the people who will use it before drawing anything.",
    color: "#2F54EB",
    icon: <Search />,
  },
  {
    title: "Sketch",
    description: "Rough shapes and fast decisions. Throw most of them away.",
    color: "#0F9D8A",
    icon: <PenTool />,
  },
  {
    title: "Structure",
    description: "Settle the layout, hierarchy and rhythm of each screen.",
    color: "#D99A00",
    icon: <Layers />,
  },
  {
    title: "Build",
    description: "Turn the system into components real data can flow through.",
    color: "#E2603A",
    icon: <Box />,
  },
  {
    title: "Polish",
    description: "Motion, edge cases, empty states and the last few pixels.",
    color: "#A24BC0",
    icon: <Sparkles />,
  },
  {
    title: "Ship",
    description: "Put it in front of people and watch what they do.",
    color: "#4A5578",
    icon: <Rocket />,
  },
];

const INSTALL = `npx shadcn@latest add ${REGISTRY}`;

const USAGE = `import { OrbitScroll } from "./OrbitScroll";
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
        // add as many as you like
      ]}
    />
  );
}`;

const PROPS: [string, string, string][] = [
  ["items", "OrbitItem[]", "title, description, color and an optional icon for each card"],
  ["eyebrow", "string", "Optional line shown above the active title"],
  ["id", "string", "Optional section id, so you can link to it"],
];

function Index() {
  return (
    <div className="relative selection:bg-[#2F54EB] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 border-b border-[#1B2140]/10 bg-[#ECEEF1]/90 px-6 py-4 backdrop-blur-md md:px-16">
        <p>
          <span className="text-lg font-extrabold tracking-tight" style={{ fontStretch: "80%" }}>
            orbit-scroll
          </span>
          <span className="ml-3 hidden opacity-60 md:inline">
            A scroll-driven orbit carousel for React
          </span>
        </p>
        <nav className="flex items-center gap-3">
          <a
            href={REPO}
            aria-label="Source code on GitHub"
            title="Source code on GitHub"
            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-[#1B2140]/10"
          >
            <Github className="size-5" />
          </a>
          <a
            href="#use-it"
            className="rounded-full border-[1.5px] border-current px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-[#1B2140] hover:text-[#ECEEF1]"
          >
            Use it
          </a>
        </nav>
      </header>

      <h1 className="sr-only">{TITLE}</h1>
      <OrbitScroll eyebrow="How a feature ships" items={ITEMS} />

      <UseIt />
    </div>
  );
}

function UseIt() {
  return (
    <section
      id="use-it"
      style={{ background: INK, color: PAPER }}
      className="relative z-10 scroll-mt-16 px-6 pb-10 pt-24 md:px-16 md:pt-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            className="text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] md:text-7xl"
            style={{ fontStretch: "75%" }}
          >
            Use it in your project
          </h2>
          <ol className="mt-12 space-y-8">
            <Step n={1} title="Add the component">
              <span className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#141935] py-2 pl-4 pr-2">
                <span className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1 text-sm">
                  <Mono>{INSTALL}</Mono>
                </span>
                <CopyButton text={INSTALL} />
              </span>
              <span className="mt-3 block">
                Or copy <Mono>src/components/OrbitScroll.tsx</Mono> by hand and install{" "}
                <Mono>framer-motion</Mono>. Styling uses Tailwind.
              </span>
            </Step>
            <Step n={2} title="Pass your items">
              Each item gets a title, a short description, a color and an optional icon.
            </Step>
          </ol>
        </div>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141935]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-sm">
              <span className="opacity-60">Process.tsx</span>
              <CopyButton text={USAGE} />
            </div>
            <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed md:p-6 md:text-sm">
              <code style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{highlight(USAGE)}</code>
            </pre>
          </div>

          <table className="mt-10 w-full text-left text-sm md:text-base">
            <thead className="opacity-60">
              <tr className="border-b border-white/15">
                <th className="py-3 pr-4 font-medium">Prop</th>
                <th className="py-3 pr-4 font-medium">Type</th>
                <th className="py-3 font-medium">What it does</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map(([name, type, what]) => (
                <tr key={name} className="border-b border-white/10 align-top">
                  <td className="py-3 pr-4">
                    <Mono>{name}</Mono>
                  </td>
                  <td className="py-3 pr-4 opacity-70">
                    <Mono>{type}</Mono>
                  </td>
                  <td className="py-3 opacity-80">{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-6xl items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm">
        <p className="opacity-60">
          Made by{" "}
          <a href="https://github.com/mesubash" className="underline underline-offset-4">
            Subash Singh Dhami
          </a>
          . MIT licensed.
        </p>
        <a
          href={REPO}
          aria-label="Source code on GitHub"
          title="Source code on GitHub"
          className="grid size-9 place-items-center rounded-full opacity-70 transition hover:bg-white/10 hover:opacity-100"
        >
          <Github className="size-5" />
        </a>
      </footer>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2">
      <span
        className="text-3xl font-extrabold leading-none"
        style={{ color: ITEMS[n - 1].color, fontStretch: "75%" }}
      >
        {n}
      </span>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-1 leading-relaxed opacity-75">{children}</div>
      </div>
    </li>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="text-[0.9em]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {children}
    </code>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          return; // clipboard blocked; leave the label as is
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

// Tiny highlighter for the static snippet above: comments, strings, JSX tags, keywords.
const TOKEN = /(\/\/.*$)|("[^"]*")|(<\/?[A-Z]\w*|\/>)|\b(import|from|export|function|return)\b/gm;
const TOKEN_COLOR = ["#ECEEF180", "#F2C14E", "#8EA6FF", "#FF8E6E"];

function highlight(code: string) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    out.push(code.slice(last, m.index));
    const group = m.slice(1).findIndex(Boolean);
    out.push(
      <span key={m.index} style={{ color: TOKEN_COLOR[group] }}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}
