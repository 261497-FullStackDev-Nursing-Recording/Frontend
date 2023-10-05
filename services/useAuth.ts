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

 
  // const getAuth = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get("/api/auth/me", { withCredentials: true });
  //     setUser(res.data);
  //     setIsLoading("signedIn");
  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading("loggedOut");
  //   }
  // };

  //set user if isLoading is true
  async function getAuth() {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5001/api/auth/me",{ withCredentials: true}
      );
      if (res.data) {
        setUser(res.data);
        return console.log(res.data);
      }
    } catch (error) {
      console.log("Error fetching data:",error);
      alert('please sign in...');
      window.location.href = '/Login';
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
    },
    {withCredentials: true});
    

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

  async function getUser() {
    setIsLoading(true);
    const res = await axios.get<any>("http://localhost:5001/api/auth/me")
    setIsLoading(false);
  }

  return { signIn, user, isLoading, signOut, getUser, getAuth };
}

export default useAuth;
