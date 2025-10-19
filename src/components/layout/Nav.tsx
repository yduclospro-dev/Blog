'use client'

import Link from 'next/link'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'
import { Button, ButtonLink } from '@/components/ui'

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useUserStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-around">
          <div className="flex-1">
            <Link 
              href="/" 
              className="text-3xl font-extrabold text-white hover:text-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-4xl">📰</span>
              <span>Blog</span>
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center">
            <Link 
              href="/articles" 
              className="text-3xl font-extrabold text-white hover:text-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-4xl">📚</span>
              <span>Articles</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-8">
              {isAuthenticated && currentUser ? (
                <>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-semibold">
                      {currentUser.username}
                    </span>
                  </div>
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    label="Déconnexion"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    }
                  />
                </>
              ) : (
                <>
                  <ButtonLink 
                    href="/login" 
                    variant="secondary"
                    label="Connexion"
                  />
                  <ButtonLink 
                    href="/registration" 
                    variant="primary"
                    label="S'inscrire"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}