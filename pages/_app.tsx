import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { Roboto } from "@next/font/google";
import SideBar from "@/components/sideBar";
import Reset from "../styles/reset";
import Layout from "@/components/layout";
import dynamic from "next/dynamic";
const SparkleTrail = dynamic(() => import("@/components/sparkleTrail"), {
  ssr: false,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Reset />
        <SparkleTrail>
          <Layout>
            <div className={roboto.className}>
              <SideBar />
              <Component {...pageProps} />
            </div>
          </Layout>
        </SparkleTrail>
      </ThemeProvider>
    </>
  );
}
