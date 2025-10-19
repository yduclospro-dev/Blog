"use client";
import Link from "next/link";
import { Button, Input, Card } from "@/components/ui";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPresenterProps {
  formData: LoginFormData;
  error: string;
  successMessage?: string;
  isLoading?: boolean;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginPresenter({
  formData,
  error,
  successMessage,
  isLoading = false,
  onInputChange,
  onSubmit,
}: LoginPresenterProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card variant="auth" padding="lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('email', e.target.value)}
              variant="auth"
              disabled={isLoading}
            />

            <Input
              id="password"
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('password', e.target.value)}
              variant="auth"
              disabled={isLoading}
            />

            {successMessage && (
              <p className="text-green-600 text-sm font-medium text-center bg-green-50 p-3 rounded-lg">
                {successMessage}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              fullWidth
              label={isLoading ? "Connexion en cours..." : "Se connecter"}
            />
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/registration" className="text-indigo-600 hover:text-indigo-500 font-medium">
              S&apos;inscrire
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
