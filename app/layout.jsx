import "@/app/globals.css";
import localFont from "next/font/local";
import Head from "next/head";
import QueryProvider from "./provider/QueryClientProvider";
import ToastMessageProvider from "./provider/MessageProvider";
import { UserProvider } from "./provider/UserProvider";

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
    { path: "./fonts/Pretendard-Medium.woff2", weight: "500" },
    {
      path: "./fonts/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    { path: "./fonts/Pretendard-Bold.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

// temp
export const metadata = {
  title: "GemHi Admin",
  description: "GemHi Community Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <body className={`${pretendard.variable} antialiased mb-12`}>
        <QueryProvider>
          <UserProvider>
            <ToastMessageProvider>{children}</ToastMessageProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
