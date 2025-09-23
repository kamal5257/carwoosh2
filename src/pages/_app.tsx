// pages/_app.tsx
import "../app/globals.css";
import { Header } from "@/components/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps & { router: unknown }) {
  // Pages where Header should be visible
  const pagesWithHeader = ["/", "/dashboard", "/services", "/parts","/trackStatus","/orderHistory", "/profile","/myVehicle"]; // ✅ add all pages where you want header

  const shouldShowHeader = pagesWithHeader.includes((router).pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
