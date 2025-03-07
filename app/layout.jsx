import localFont from "next/font/local";
import "@/app/globals.css";

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
      <body className={`${pretendard.variable} antialiased mb-12`}>
        {children}
      </body>
    </html>
  );
}
