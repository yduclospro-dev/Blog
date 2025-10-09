import "./globals.css"
import Navbar from "../components/layout/Nav"
import Footer from "../components/layout/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
  )
}