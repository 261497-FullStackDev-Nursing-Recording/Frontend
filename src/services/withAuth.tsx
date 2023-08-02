"use client";

import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//use to login button check is login or not
const WithAuth = (Component: any) => {
	return function ({ ...props }) {
		const { user, isLoading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isLoading && !user) {
				router.push("/");
			}
		}, [router, user, isLoading]);

		if (isLoading) {
			return <div>Loading</div>;
		}

		return <Component {...props} />;
	};
};

export default WithAuth;
