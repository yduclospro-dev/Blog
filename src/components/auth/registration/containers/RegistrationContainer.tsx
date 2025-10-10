'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegistrationPresenter from '../presenters/RegistrationPresenter'
import { useUserStore } from '@/stores/userStore'

export default function RegistrationContainer() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const { addUser, checkIfUsernameOrEmailExists } = useUserStore()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!formData.username || !formData.email || !formData.password) {
      setError('Tous les champs sont obligatoires')
      setIsLoading(false)
      return
    }

    try {
      if (checkIfUsernameOrEmailExists(formData.username, formData.email)) {
        setError('Le nom d\'utilisateur ou l\'email existe déjà')
        setIsLoading(false)
        return
      }

      addUser({ id: crypto.randomUUID(), ...formData })
      router.push('/login')
    } catch (error) {
      console.error(error)
      setError('Erreur lors de l\'inscription')
    } finally {
      setIsLoading(false)
    }
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