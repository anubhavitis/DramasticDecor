import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 poweredByHeader:false,
 agentRules:false,
 devIndicators:false,
 turbopack:{root:process.cwd()},
 images:{remotePatterns:[{protocol:'https',hostname:'*.public.blob.vercel-storage.com',pathname:'/products/**'}]},
};
export default nextConfig;
