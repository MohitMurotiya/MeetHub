/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'www.kindpng.com'
            }
        ]
    },
}

module.exports = nextConfig
