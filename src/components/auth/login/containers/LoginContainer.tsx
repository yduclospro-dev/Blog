"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import LoginPresenter from "@/components/auth/login/presenters/LoginPresenter";

export default function LoginContainer() {
  const getUserByEmail = useUserStore((state) => state.getUserByEmail);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null);


  useEffect(() => {
    if (isLoggedIn && connectedEmail) {
      alert(`${connectedEmail} is connected {${isLoggedIn}}`);
    }
  }, [isLoggedIn, connectedEmail]);


  const setCookie = (name: string, value: string, maxAgeSeconds = 60 * 60 * 24) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = getUserByEmail(email);

    if (!user) {
      setError("Aucun compte trouvé avec cet email.");
      return;
    }

    if (user.password !== password) {
      setError("Mot de passe incorrect.");
      return;
    }

    setCookie("is_connected", "true");
    setCookie("connected_email", user.email);

    setIsLoggedIn(true);
    setConnectedEmail(user.email);
    setError("");
    window.location.href = "/";
  };


  const handleLogout = () => {
    document.cookie = "is_connected=false; path=/; max-age=0; SameSite=Lax";
    document.cookie = "connected_email=; path=/; max-age=0; SameSite=Lax";
    alert("Déconnexion réussie !")
    window.location.href = "/";
  };

  return (
    <LoginPresenter
      email={email}
      password={password}
      error={error}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
      onLogout={handleLogout}
    />
  );

}