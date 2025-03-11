import { Navbar } from "./components/Navbar";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-dvw">
        <aside>
          <Navbar />
        </aside>
        <main className="bg-black text-white w-full p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
