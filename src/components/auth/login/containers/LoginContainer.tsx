"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import LoginPresenter from "../presenters/LoginPresenter";

export default function LoginContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUserStore();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setError(result.error || "Email ou mot de passe incorrect.");
        setIsLoading(false);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <LoginPresenter
      formData={formData}
      error={error}
      successMessage={successMessage}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      onSubmit={handleLogin}
    />
  );
}