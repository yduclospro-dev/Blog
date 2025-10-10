"use client";
import { useEffect, useState } from "react";
import HomePresenter from "../presenters/HomePresenter";

export default function HomeContainer() {
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null);

  // 🔹 Récupération du cookie au chargement
  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .reduce((acc: Record<string, string>, curr) => {
        const [key, val] = curr.split("=");
        acc[key] = decodeURIComponent(val);
        return acc;
      }, {});

    if (cookies.is_connected === "true" && cookies.connected_email) {
      setConnectedEmail(cookies.connected_email);
    }
  }, []);

    return <HomePresenter connectedEmail={connectedEmail} />;
}