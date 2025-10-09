import Link from 'next/link'

export default function Navbar() {
  return (
    <nav 
      style={{ backgroundColor: "var(--blue)" }}
      className="text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">
        <Link href="/" className="hover:text-gray-200 transition-colors">
          Blog
        </Link>
      </div>
      <div className="space-x-6">
        <Link href="/login" className="hover:text-gray-200 transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
}
