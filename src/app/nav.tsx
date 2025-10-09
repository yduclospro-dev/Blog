export default function Navbar() {
  return (
    <nav className="navbar px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">
        <a href="/" className="hover:text-gray-200 transition-colors">
          Blog
        </a>
      </div>
      <div className="space-x-6">
        <a href="/login" className="hover:text-gray-200 transition-colors">
          Contact
        </a>
      </div>
    </nav>
  );
}
