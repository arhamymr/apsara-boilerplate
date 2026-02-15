/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure TS from external workspace packages is transpiled
  transpilePackages: ["@workspace/ui"],
};
 
export default nextConfig;
