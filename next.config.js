/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        SECRET_KEY: process.env.SECRET_KEY,
        API_KEY: "AIzaSyAQTvgAqMsn39YnI7GR8WX78FLgUwMZE8E",
        AUTH_DOMAIN: "kate-app-53aa1.firebaseapp.com",
        PROJECT_ID: "kate-app-53aa1",
        STORAGE_BUCKET: "kate-app-53aa1.appspot.com",
        MESSAGING_SENDER: "942777086211",
        APP_ID: "1:942777086211:web:9d36ffe2eb655328cef936",
        MEASUREMENT_ID: "G-9SHP7Y3NKJ"
    },
    images: {
        domains: ['thinkbeyondbook.com']
    }
}

module.exports = nextConfig
