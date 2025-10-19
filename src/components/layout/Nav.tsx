'use client'

import Link from 'next/link'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'
import { Button, ButtonLink, Toast } from '@/components/ui'
import { useState, useEffect } from 'react'
import type { ToastType } from "@/components/ui/Toast/toastTypes";

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useUserStore()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleLogout = () => {
    logout()
    setToast({ message: "Déconnexion réussie !", type: "success" });
    setIsMenuOpen(false)
    
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 1500);
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Desktop & Mobile Header */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl sm:text-3xl font-extrabold text-white hover:text-gray-100 transition-all duration-200 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-3xl sm:text-4xl">📰</span>
              <span>Blog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Link 
              href="/articles" 
              className="text-3xl font-extrabold text-white hover:text-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-4xl">📚</span>
              <span>Articles</span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-8">
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

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] bg-blue-600 z-40 overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              {/* Articles Link */}
              <Link 
                href="/articles" 
                className="flex items-center gap-3 text-white text-xl font-bold hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-3xl">📚</span>
                <span>Articles</span>
              </Link>

              <div className="border-t border-white/20 my-4"></div>

              {/* Auth Section */}
              {isAuthenticated && currentUser ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md text-lg">
                      {currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-semibold text-lg">
                      {currentUser.username}
                    </span>
                  </div>
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    label="Déconnexion"
                    className="w-full"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    }
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <ButtonLink 
                    href="/login" 
                    variant="secondary"
                    label="Connexion"
                    className="w-full justify-center"
                  />
                  <ButtonLink 
                    href="/registration" 
                    variant="primary"
                    label="S'inscrire"
                    className="w-full justify-center bg-white text-blue-600 hover:bg-gray-100"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}