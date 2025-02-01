"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { setSession } from '../../redux/sessionSlice';

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated" && session) {
      // Session data available, so dispatch to Redux
      dispatch(setSession({
        user: session.user,
        expires: session.expires,
      }));
      console.log("Session Data:", session);  // Log session data
      router.push("/dashboard");  // Redirect after successful session check
    }
  }, [session, status, dispatch, router]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // After successful login, session will be available, dispatch to Redux
      if (session?.user) {
        dispatch(setSession({
          user: session.user,
          expires: session.expires,
        }));
      }
      router.push("/dashboard");
    }
  };
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" }); //  Google SignIn Function
  };

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-5">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          {/*  Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            Login with Google
          </button>
        </form>


      </div>
    </div>

  );
}
