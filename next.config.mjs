/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcsjtjiqolsewkoutsag.supabase.co",
      },
    ],
  },
};

export default nextConfig;
