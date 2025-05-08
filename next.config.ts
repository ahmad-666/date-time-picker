import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true, //enable react strict mode(can cause useEffect to run 2times on init render)
    //env: {customKey: 'my-value',} //add env vars , we can use .env,.env.local,... files too
    //trailingSlash: true, //redirect urls with trailing slashes to their counterpart without a trailing slash --> /about/ will redirect to /about (can cause CORS)
    //productionBrowserSourceMaps: true, //generate source maps(can cause longer build time)
    //webVitalsAttribution: ['CLS', 'LCP'],
    //basePath: '/docs' //add prefix to all routes/assets --> <Link href="/about"> will go to /docs/about , for images we need to manually add basePath -->  <Image src="/docs/me.png" />
    //assetPrefix: 'https://cdn.mydomain.com' //for add CDN
    //distDir: 'build' // custom build directory to use instead of .next
    images: {
        //? we have .next/cache/images,.next/cache/fetch-cache,...
        // minimumCacheTTL: 31536000, //use 31536000 for cache images for 1year , use 0 to disable caching
        //? for add image optimization for absolute urls
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.cufinder.io',
                pathname: '**',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'media.cufinder.io',
                pathname: '**',
                port: ''
            }
        ]
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'] //prevent sass deprecation warnings
    },
    // webpack: (config, options) => {
    //     config.module.rules.push({
    //         test: /\.(pdf|lottie)$/,
    //         type: 'asset/resource'
    //         //now we can place files with these extensions inside public folder and import them
    //         //static imports --> import file from '@/../public/pdfs/file.pdf'
    //         //dynamic imports --> const file = await import('@/../public/lotties/file.lottie')
    //         //for prevent type errors + have auto completion:
    //         //index.d.ts in root of project -->  declare module '*.pdf'; declare module '*.lottie';
    //         //we could place files with any extension inside /src/assets/ and import them too without setting webpack loader
    //     });
    //     return config;
    // },
    async headers() {
        //for custom headers , we can customize 'source' for specific routes like adding dynamic url param,use regex,...
        //check https://nextjs.org/docs/app/api-reference/next-config-js/headers
        return [
            {
                //source: '/about','/products/:id' , '/products/:path*'
                source: '/api/:path*', // matching all API route handlers
                //add CORS/Security headers:
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: `${process.env.NEXT_PUBLIC_FRONT_URL}` //could use '*' too
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Accept, Authorization'
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'Cross-Origin-Resource-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Download-Options',
                        value: 'noopen'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Permitted-Cross-Domain-Policies',
                        value: 'none'
                    }
                ]
            }
            // {
            //     source: '/:all*(jpg|jpeg|png|svg|gif|webp|avif)', //for images
            //     locale: false,
            //     headers: [
            //         {
            //             key: 'Cache-Control', //for add caching to images
            //             value: 'public, max-age=31536000, must-revalidate' //1year
            //         }
            //     ]
            // }
        ];
    },
    // async redirects() {
    //     // redirect an incoming request path to a different destination path , we can customize 'source' for specific routes like adding dynamic url param,use regex,...
    //     //rewrite act like proxy but redirects will reroute to a new page and show the URL changes.
    //     //check https://nextjs.org/docs/app/api-reference/next-config-js/redirects
    //     return [
    //         {
    //             source: '/',
    //             destination: '/',
    //             permanent: true
    //         }
    //     ];
    // },
    // async rewrites() {
    //     //map an incoming request path to a different destination path , we can customize 'source' for specific routes like adding dynamic url param,use regex,...
    //     //rewrite act like proxy but redirects will reroute to a new page and show the URL changes.
    //     //check https://nextjs.org/docs/app/api-reference/next-config-js/rewrites
    //     return [
    //         {
    //             source: '/',
    //             destination: '/'
    //         }
    //     ];
    // },
    // webpack: () => {} , //extends webpack config
    experimental: {
        largePageDataBytes: 20 * 128 * 1000 //2mb(default is 128kb) , tweak nextjs max allow size for props of pages
        //optimizePackageImports: ['package-name'] //only load the modules you are actually using
    }
};

export default nextConfig;
