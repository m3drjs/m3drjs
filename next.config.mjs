/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure preview host can load smoothly
  experimental: {
    // any experimental options if needed
  },
  images: {
    domains: ['images.unsplash.com', 'dummyimage.com'],
  }
};

export default nextConfig;
