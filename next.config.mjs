/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export = same deploy target as vue/react/svelte (Cloudflare Pages)
  output: 'export',
  // Trailing slashes so CF Pages serves index.html correctly for `/` route
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
