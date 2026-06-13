/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  ...(isStaticExport
    ? { output: "export", basePath: "/Netracctv", trailingSlash: true }
    : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
};

export default nextConfig;
