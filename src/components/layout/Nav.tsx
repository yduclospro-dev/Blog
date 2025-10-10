import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan to-darkblue rounded-lg flex items-center justify-center transition group-hover:scale-105">
            <span className="text-white font-bold text-lg">BH</span>
          </div>
          <span className="text-xl font-bold text-white">BlogHub</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline-block text-slate-300 hover:text-sky-400 transition font-medium px-4 py-2">
            Connexion
          </Link>
          <Link href="/registration" className="bg-gradient-to-r from-cyan to-darkblue text-white px-5 py-2 rounded-lg hover:from-sky-600 hover:to-blue-700 transition font-medium shadow-lg shadow-sky-500/30">
            S'inscrire
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}