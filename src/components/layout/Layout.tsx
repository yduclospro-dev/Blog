import "./globals.css";
import Navbar from "./nav";
import Footer from "./footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}