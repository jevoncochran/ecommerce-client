/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "jevonc-next-ecommerce.s3.us-east-2.amazonaws.com",
        protocol: "https",
        port: "",
      },
      { hostname: "fakeimg.pl", protocol: "https", port: "" },
    ],
  },
};

module.exports = nextConfig;
