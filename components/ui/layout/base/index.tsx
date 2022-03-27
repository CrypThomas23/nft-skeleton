/* eslint-disable @next/next/no-page-custom-font */
import { Footer, Header } from "@components/ui/common";
import Head from "next/head";
import { PropsWithChildren } from "react";

type Props = {
  title?: string;
  desc?: string;
  url?: string;
};

export default function BaseLayout({
  children,
  title,
  desc,
  url,
}: PropsWithChildren<Props>) {
  const baseDesc = "";
  const baseUrl = "";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <title>MyNftProject{title && ` - ${title}`}</title>
        <meta name="description" content={desc || baseDesc} />

        {/*<!-- Google / Search Engine Tags -->*/}
        <meta
          itemProp="name"
          content={`MyNftProject${title ? ` - ${title}` : ""}`}
        />
        <meta itemProp="description" content={desc || baseDesc} />
        <meta
          itemProp="image"
          content={`${baseUrl}/images/imgToUseForMeta.jpg`}
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta
          property="og:title"
          content={`MyNftProject${title ? ` - ${title}` : ""}`}
        />
        <meta property="og:description" content={desc || baseDesc} />
        <meta
          property="og:image"
          content={`${baseUrl}/images/imgToUseForMeta.jpg`}
        />
        <meta property="og:url" content={`${baseUrl}${url || ""}`} />
        <meta property="og:type" content="website" />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta
          name="twitter:title"
          content={`MyNftProject${title ? ` - ${title}` : ""}`}
        />
        <meta name="twitter:description" content={desc || baseDesc} />
        <meta
          name="twitter:image"
          content={`${baseUrl}/images/imgToUseForMeta.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
