/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        SECRET_KEY: process.env.SECRET_KEY,
        API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        MESSAGING_SENDER: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
        APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    },
    images: {
        domains: ['thinkbeyondbook.com']
    }
}

module.exports = nextConfig
