'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import RegistrationPresenter from '../presenters/RegistrationPresenter'

export default function RegistrationContainer() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const { register } = useUserStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Tous les champs sont obligatoires.')
      setIsLoading(false)
      return
    }

    if (formData.password.trim().length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
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
        setError(result.error || "Erreur lors de l'inscription")
        setIsLoading(false)
        return
      }

      console.log('✅ Inscription réussie ! Redirection vers /login')
      router.push('/login?registered=true')
      router.refresh()
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
    
    setIsLoading(false)
  }

  return (
    <RegistrationPresenter
      formData={formData}
      isLoading={isLoading}
      error={error}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}