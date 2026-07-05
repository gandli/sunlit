import './globals.css';

export const metadata = {
  title: 'sunlit — Next.js',
  description: 'A tiny web toy that simulates warm sunlight through window blinds. Next.js 15 (App Router) port.',
  openGraph: {
    title: 'Sunlit — Next.js',
    description: 'A tiny web toy that simulates warm sunlight through window blinds. Next.js 15 port.',
    url: 'https://sunlit-next.pages.dev/',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

// Root layout — Server Component by default.
// The <body> starts empty (no .dark, no .animation-ready) so SSR matches
// the SPEC "initial state" contract exactly.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
