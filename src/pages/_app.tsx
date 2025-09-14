// pages/_app.tsx
import "../app/globals.css";
import {Header} from "@/components/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
          <Component {...pageProps} />
      </main>

    </>
  );
}
