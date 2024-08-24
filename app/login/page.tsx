"use client";
import { getUser } from "@/hooks/useUser";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);

      push("/account");
    } catch (e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (user && !error) push("/account");
    })();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
