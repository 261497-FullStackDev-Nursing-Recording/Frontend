/** @type {import('next').NextConfig} */

//send to proxy to fix cors
const proxyURL = process.env.BACKEND_PROXY_URL;
if (!proxyURL) {
	throw new Error("Backend url environment variable is not set");
}
const nextConfig = {
	rewrites: async function () {
		return [
			{
				source: "/api/:path*",
				destination: `${proxyURL}/:path*`, // The :path parameter is used here so will not be automatically passed in the query
			},
		];
	},
};

module.exports = nextConfig;
