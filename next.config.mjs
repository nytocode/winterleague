/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "woryblzljeqvfbqvpxcu.supabase.co",
      },
    ],
  },
};

export default nextConfig;
