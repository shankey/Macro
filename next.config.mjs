/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output keeps the Docker image small; Vercel ignores it.
  output: "standalone",
};

export default nextConfig;
