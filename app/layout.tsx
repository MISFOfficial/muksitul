import VideoResume from "./_Component/VideoResume/VideoResume";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* <VideoResume /> */}
        {children}
      </body>
    </html>
  );
}
