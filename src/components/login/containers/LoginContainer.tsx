"use client";
import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

import LoginPresenter from "../presenters/LoginPresenter";

export default function LoginContainer() {
  const getUserByEmail = useUserStore((state) => state.getUserByEmail);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null);


  // ✅ Définit un cookie
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

    // ✅ Crée les cookies de session
    setCookie("is_connected", "true");
    setCookie("connected_email", user.email);

    setIsLoggedIn(true);
    setConnectedEmail(user.email);
    setError("");

    // 🔹 Lecture du cookie pour afficher le mail
    const cookies = document.cookie
      .split("; ")
      .reduce((acc: Record<string, string>, curr) => {
        const [key, val] = curr.split("=");
        acc[key] = decodeURIComponent(val);
        return acc;
      }, {});
    
    alert(`${cookies.connected_email} is connected {${cookies.is_connected}}`);
  };


   return (
    <LoginPresenter
      email={email}
      password={password}
      error={error}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
    />
  );

}