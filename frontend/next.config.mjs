/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "mongoose",
      "bcryptjs",
      "cloudinary",
      "@google-analytics/data",
    ],
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/agenda",
        destination: "/kegiatan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
