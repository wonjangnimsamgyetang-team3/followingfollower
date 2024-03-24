/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "t1.kakaocdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcsjtjiqolsewkoutsag.supabase.co",
      },
    ],
  },
};

export default nextConfig;
