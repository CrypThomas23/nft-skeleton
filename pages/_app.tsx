import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NftProvider } from "@components/providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NftProvider>
      <Component {...pageProps} />
    </NftProvider>
  );
}

export default MyApp;
