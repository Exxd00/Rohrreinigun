"use client";

import { useCallback, useEffect, useState } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/admin-auth", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (active) setIsAuthenticated(data.authenticated === true);
      })
      .catch(() => {
        if (active) setIsAuthenticated(false);
      })
      .finally(() => {
        if (active) setIsCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (password: string) => {
    const response = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const authenticated = response.ok;
    setIsAuthenticated(authenticated);
    return authenticated;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/admin-auth", { method: "DELETE" }).catch(() => undefined);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isCheckingAuth, login, logout };
}
