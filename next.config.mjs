/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                "*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
                },
            },
        },
    },
    images: {
        domains: [],
    },
    // Windows 파일 시스템 캐시 문제 해결
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            };
        }
        return config;
    },
    // 개발 서버 설정
    devIndicators: {
        buildActivity: false,
    },
};

export default nextConfig;
