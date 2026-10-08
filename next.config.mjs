/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/tech-icons", destination: "/icons", permanent: true },
      { source: "/learning-resources", destination: "/learn", permanent: true },
    ]
  },
}

export default nextConfig
