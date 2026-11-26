import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type OrbitItem = {
  title: string;
  description: string;
  /** Any CSS color. Drives the card gradient, glow and accents. */
  color: string;
  icon?: ReactNode;
};

type OrbitScrollProps = {
  items: OrbitItem[];
  /** Small label above the active title. */
  eyebrow?: string;
  id?: string;
};

/*
 * Cards sit on a circle whose center is the right edge of the viewport; the card at
 * 180° (9 o'clock) is active and the off-screen half of the circle hides itself.
 * Scroll picks the active item (each gets an equal slice of the section) and a spring
 * swings the orbit to it, so the orbit always comes to rest on a card.
 *
 * Sizes use --u, a viewport unit set per breakpoint on the sticky stage, so the
 * orbit always fits its half of the screen.
 */
const ACTIVE_ANGLE = 180;
const RADIUS = 42; // in --u
const CARD_HEIGHT = [44, 38, 32, 30]; // in --u, by distance from active
const u = (n: number) => `calc(var(--u) * ${n.toFixed(2)})`;

export function OrbitScroll({ items, eyebrow, id }: OrbitScrollProps) {
  const n = items.length;
  // Neighbours 60° apart look best; tighten only when there are more than six items.
  const step = Math.min(60, 360 / n);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const target = useMotionValue(ACTIVE_ANGLE);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
    setActive(i);
    target.set(ACTIVE_ANGLE + i * step);
  });
  const springRotation = useSpring(target, { stiffness: 70, damping: 18, mass: 1 });
  const rotation = reduceMotion ? target : springRotation;

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (range * (i + 0.5)) / n,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const item = items[active];

  return (
    <section id={id} ref={sectionRef} style={{ height: `${(n + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden [--cy:72%] [--u:min(0.6vh,1.05vw)] md:[--cy:50%] md:[--u:min(1vh,0.6vw)]">
        {/* Dial: the orbit itself, ticked like an astrolabe, turning with the cards */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute opacity-30"
          style={{
            width: u(RADIUS * 2),
            height: u(RADIUS * 2),
            left: "100%",
            top: "var(--cy)",
            x: "-50%",
            y: "-50%",
            rotate: rotation,
          }}
        >
          <Dial />
        </motion.div>

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {items.map((it, i) => (
            <OrbitCard
              key={i}
              item={it}
              index={i}
              baseAngle={-i * step}
              rotation={rotation}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="relative z-30 flex w-full flex-col px-6 pt-28 md:h-full md:w-1/2 md:justify-center md:px-16 md:pt-0">
          <div className="max-w-lg">
            {eyebrow && <p className="mb-4 text-base opacity-60 md:mb-6 md:text-lg">{eyebrow}</p>}
            <div className="relative min-h-[9.5rem] md:min-h-[14rem]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={active}
                  aria-live="polite"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                >
                  <h2
                    className="text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-[5.5rem]"
                    style={{ fontStretch: "82%" }}
                  >
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-[34ch] text-lg leading-snug opacity-70 md:mt-6 md:text-xl">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tick navigation: one tick per item, echoing the dial */}
            <div className="mt-6 flex h-8 items-end gap-1 md:mt-10">
              {items.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${it.title}`}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex h-full w-5 items-end justify-center rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-current"
                >
                  <motion.span
                    className="block w-[3px] rounded-full group-hover:opacity-60"
                    initial={false}
                    animate={{ height: i === active ? 32 : 14, opacity: i === active ? 1 : 0.25 }}
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    style={{ backgroundColor: i === active ? it.color : "currentColor" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

function Dial() {
  return (
    <svg viewBox="-100 -100 200 200" className="size-full overflow-visible">
      <circle r="100" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      {TICKS.map((a) => {
        const major = a % 30 === 0;
        const rad = (a * Math.PI) / 180;
        const r1 = major ? 93 : 97;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        return (
          <line
            key={a}
            x1={(c * r1).toFixed(3)}
            y1={(s * r1).toFixed(3)}
            x2={(c * 100).toFixed(3)}
            y2={(s * 100).toFixed(3)}
            stroke="currentColor"
            strokeWidth={major ? 1.5 : 1}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

function OrbitCard({
  item,
  index,
  baseAngle,
  rotation,
  reduceMotion,
}: {
  item: OrbitItem;
  index: number;
  baseAngle: number;
  rotation: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const theta = useTransform(rotation, (r) => (((baseAngle + r) % 360) + 360) % 360);
  const dist = useTransform(theta, (t) => Math.abs(((t - ACTIVE_ANGLE + 540) % 360) - 180));

  const transform = useTransform(theta, (t) => {
    const rad = (t * Math.PI) / 180;
    return `translate3d(${u(Math.cos(rad) * RADIUS)}, ${u(Math.sin(rad) * RADIUS)}, 0px)`;
  });
  const scale = useTransform(dist, [0, 60, 120, 180], [1, 0.6, 0.4, 0.35]);
  const opacity = useTransform(dist, [0, 60, 90, 110], [1, 0.8, 0.5, 0]);
  const blur = useTransform(dist, [0, 60, 120], [0, 2, 6]);
  const filter = useTransform(blur, (b) => (reduceMotion ? "none" : `blur(${b.toFixed(2)}px)`));
  const zIndex = useTransform(dist, (d) => (d < 30 ? 10 : d < 90 ? 7 : 4));

  // Landscape when active, portrait when away.
  const height = useTransform(dist, [0, 60, 120, 180], CARD_HEIGHT);
  const ratio = useTransform(dist, [0, 45, 90], [1.55, 0.9, 0.55]);
  const width = useTransform<number, string>([height, ratio], ([h, r]) => u(h * r));
  const heightCss = useTransform(height, u);
  const details = useTransform(dist, [0, 25], [1, 0]);
  const shadowAlpha = useTransform(dist, [0, 40], [1, 0]);
  const boxShadow = useTransform(
    shadowAlpha,
    (a) =>
      `0 40px 70px -30px color-mix(in oklab, ${item.color} ${Math.round(a * 90)}%, transparent)`,
  );

  return (
    <motion.div
      className="absolute left-full top-[var(--cy)]"
      style={{ transform, opacity, zIndex, filter }}
    >
      <motion.div
        className="relative flex flex-col justify-between overflow-hidden text-white"
        style={{
          width,
          height: heightCss,
          scale,
          x: "-50%",
          y: "-50%",
          boxShadow,
          background: item.color,
          borderRadius: u(2.4),
          padding: u(3.2),
        }}
      >
        {/* Step number as the card's graphic */}
        <span
          aria-hidden
          className="pointer-events-none absolute font-extrabold leading-[0.8] opacity-20"
          style={{ right: u(2.4), bottom: u(-1.2), fontSize: u(26), fontStretch: "75%" }}
        >
          {index + 1}
        </span>
        <div
          className="relative [&>svg]:size-[var(--icon)]"
          style={{ ["--icon" as string]: u(4.4) }}
        >
          {item.icon}
        </div>
        <motion.div
          className="relative font-bold leading-none tracking-[-0.01em]"
          style={{ opacity: details, fontSize: u(4.6), fontStretch: "82%" }}
        >
          {item.title}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
