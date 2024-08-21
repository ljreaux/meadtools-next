import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type User =
  { id: number, email: string, role: 'admin' | "user" }


export const useUser = () => {
  const [user, setUser] = useState<null | User>(null)
  const [error, setError] = useState<null | AxiosError>(null)
  const { push } = useRouter();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error || !user) {
        setError(error);
        push("/");
      } else {
        setUser(user);
      }
    })();
  }, []);
  return { user, error }
}
const getUser = async () => {
  try {
    const { data } = await axios.get("/api/auth/me");
    if (data.status !== 200) throw new Error(data);
    return {
      user: data,
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError;
    return {
      user: null,
      error: error,
    };
  }
};