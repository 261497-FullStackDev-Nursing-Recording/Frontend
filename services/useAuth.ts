import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import { axiosCustom } from "./axiosCustom";
import { UserType, useAuthStore } from "./authStore";

//control logging
const debug = process.env.NEXT_PUBLIC_DEBUG_AUTH === "true";

//get state from authStore.ts created by zustand
function useAuth() {
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refresh_token", "");
  const [user, setUser, isLoading, setIsLoading] = useAuthStore((state) => [
    state.user,
    state.setUser,
    state.isLoading,
    state.setIsLoading,
  ]);

  //set user if isLoading is true
  const bootstrapAsync = async () => {
    setIsLoading(true);
    try {
      const res = await axiosCustom.get<UserType>(
        "http://localhost:5001/api/auth/me"
      );
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  // 	if (!user && accessToken) {
  // 		bootstrapAsync();
  // 	}
  // }, []);

  //signin use the signin from auth/index.ts from backend
  async function signIn(username: string, password: string) {
    setIsLoading(true);
    const res = await axios.post<{
      accessToken: string;
      refreshToken: string;
      user: UserType;
    }>("http://localhost:5001/api/auth/signin", {
      username,
      password,
    });

    if (debug) console.log(res);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setUser(res.data.user);
    setIsLoading(false);
  }

  async function signOut() {
    setAccessToken("");
    setRefreshToken("");
    setUser(null);
  }

  return { signIn, user, isLoading, signOut };
}

export default useAuth;
