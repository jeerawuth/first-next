/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        SECRET_KEY: process.env.SECRET_KEY,
    },
    images: {
        domains: ['thinkbeyondbook.com']
    }
}

module.exports = nextConfig
