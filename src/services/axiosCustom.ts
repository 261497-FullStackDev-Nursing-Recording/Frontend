import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import jwtDecode from "jwt-decode";

dayjs.extend(relativeTime);

const axiosCustom = axios.create();

// Control logging
const debug = process.env.NEXT_PUBLIC_DEBUG_AUTH === "true";

console.log({ debug: debug });
axiosCustom.interceptors.request.use(async (config) => {
	const accessToken = safelyParseJSON(localStorage.getItem("accessToken"));

	if (debug) console.log({ accessToken, exp: getJWTExpiry(accessToken) });

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosCustom.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = safelyParseJSON(
				localStorage.getItem("refreshToken")
			);
			if (debug) console.log({ refreshToken, exp: getJWTExpiry(refreshToken) });
			if (refreshToken) {
				try {
					const { data } = await axios.post<{
						accessToken: string;
					}>("api/auth/refreshtoken", undefined, {
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + refreshToken,
						},
					});
					if (debug)
						console.log(
							"Received new access token",
							data.accessToken,
							"exp",
							getJWTExpiry(data.accessToken)
						);
					localStorage.setItem("accessToken", JSON.stringify(data.accessToken));

					// try to execute the request again
					return axiosCustom(originalRequest);
				} catch (error) {
					/** remove refresh token */
					if (debug) console.log("Remove Tokens");
					localStorage.removeItem("refreshToken");
					localStorage.removeItem("accessToken");
				}
			}
		}
		return Promise.reject(error);
	}
);

export { axiosCustom };

export function safelyParseJSON(json: string | null) {
	let parsed;
	if (!json) return null;

	try {
		parsed = JSON.parse(json);
	} catch (e) {}

	return parsed; // Could be undefined!
}

function getJWTExpiry(jwt: string) {
	if (!jwt) return 0;

	const decoded = jwtDecode<{
		username: string;
		role: string;
		iat: number;
		exp: number;
	}>(jwt);

	const date = dayjs.unix(decoded.exp);
	// return date.fromNow() || '';
	return date.diff(dayjs(), "second") || 0;
}
