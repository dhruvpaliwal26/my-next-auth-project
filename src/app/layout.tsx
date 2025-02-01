"use client";

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Provider } from 'react-redux';
import { store } from '../redux/store';  

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>  {/* Wrap the app with Redux provider */}
          <SessionProvider>{children}</SessionProvider> {/* SessionProvider for NextAuth */}
        </Provider>
      </body>
    </html>
  );
}
