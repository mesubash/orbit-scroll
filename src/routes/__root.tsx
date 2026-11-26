import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

const DESCRIPTION = "A scroll-driven orbit carousel component for React.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "orbit-scroll" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "orbit-scroll" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  notFoundComponent: () => <Message title="Page not found" />,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ErrorComponent({ error }: ErrorComponentProps) {
  console.error(error);
  return <Message title="Something went wrong" />;
}

function Message({ title }: { title: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        <Link to="/" className="mt-6 inline-block font-semibold underline underline-offset-4">
          Back to the demo
        </Link>
      </div>
    </main>
  );
}
