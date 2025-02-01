"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession, clearSession } from "../../redux/sessionSlice";
import { RootState } from "../../redux/store";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const reduxSession = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const router = useRouter();


  //  Agar user authenticated hai, toh Redux store update karo
  useEffect(() => {
    if (status === "authenticated" && session) {
      dispatch(setSession({ user: session.user, expires: session.expires }));
    }
  }, [status, session, dispatch]);

  // Agar user unauthenticated hai ya session nahi hai, toh login page pe redirect karo
  useEffect(() => {
    console.log("Redux Session Data:", reduxSession); //  Redux session check krne ke liye console
    if (status === "unauthenticated" && !reduxSession.user) {
      router.push("/login");
    }
  }, [status, router, reduxSession]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-5 rounded-lg shadow-md w-96 mx-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Dashboard</h2>
        <div className="mb-4 ">
          {reduxSession.user ? (
            <div>
              <p className="text-lg text-gray-800">Welcome, <strong>{reduxSession.user.name}</strong></p>
              <p className="text-sm text-gray-500">{reduxSession.user.email}</p>
              <button
                onClick={() => {
                  signOut();
                  dispatch(clearSession()); // Redux session clear krne ke liye
                }}
                className="mt-6 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-center text-red-500">No user data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
