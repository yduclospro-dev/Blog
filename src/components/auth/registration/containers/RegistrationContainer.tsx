'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import RegistrationPresenter from '../presenters/RegistrationPresenter'
import { Toast } from "@/components/ui";
import type { ToastType } from "@/components/ui/Toast/toastTypes";

export default function RegistrationContainer() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const { register } = useUserStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setToast(null)

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setToast({ message: 'Tous les champs sont obligatoires.', type: 'error' })
      setIsLoading(false)
      return
    }

    if (formData.password.trim().length < 6) {
      setToast({ message: 'Le mot de passe doit contenir au moins 6 caractères.', type: 'error' })
      setIsLoading(false)
      return
    }

    try {
      const result = await register(
        formData.username,
        formData.email,
        formData.password
      )

      if (!result.success) {
        setToast({ message: result.error || "Erreur lors de l'inscription", type: 'error' })
        setIsLoading(false)
        return
      }

      console.log('✅ Inscription réussie ! Redirection vers /login')
      router.push('/login?registered=true')
      router.refresh()
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      setToast({ message: 'Une erreur est survenue. Veuillez réessayer.', type: 'error' })
    }
    
    setIsLoading(false)
  }

  return (
    <>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <RegistrationPresenter
        formData={formData}
        isLoading={isLoading}
        error="" // Deprecated: now using Toast
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}