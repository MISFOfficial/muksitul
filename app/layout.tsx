import StarField from "./_Component/Global/StarField";
import VideoResume from "./_Component/VideoResume/VideoResume";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black overflow-x-hidden">
        <StarField />
        {/* <VideoResume /> */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
