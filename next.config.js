/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "i0.wp.com", protocol: "https", port: "" }],
  },
};

module.exports = nextConfig;
