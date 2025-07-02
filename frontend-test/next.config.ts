/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bergvik.se",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
