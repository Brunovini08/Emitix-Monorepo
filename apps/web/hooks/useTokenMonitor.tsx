"use client";

import { useEffect, useRef, useState } from "react";
import { getTimeUntilExpiration } from "../utils/jwtDecode";
import { useAuth } from "../context/AuthContext";

export function useTokenMonitor() {
  const { setUser } = useAuth();
  const [sessionExpired, setSessionExpired] = useState(false)
  const lastActivityRef = useRef(Date.now())
  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now()
    }

    window.addEventListener('mousemove', updateActivity)
    window.addEventListener('keydown', updateActivity)
    window.addEventListener('click', updateActivity)
    
    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if(!token) return

    const timeLeft = getTimeUntilExpiration(token)
    const refreshThreshold = 5 * 60 * 1000

    if(timeLeft && timeLeft < refreshThreshold) {
      const now = Date.now()
      const lastActivity = lastActivityRef.current
      const activeRecently = now - lastActivity < refreshThreshold
      if(activeRecently) {
        fetch("/api/refresh", {
          method: "POST",
          credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
          if (data?.token) {
            localStorage.setItem("access_token", data?.token)
            setUser(data?.user)
          } else {
            setSessionExpired(true)
          }
        })
        .catch(() => setSessionExpired(true))
      } else {
        setSessionExpired(true)
      }
    }
    const interval = setInterval(() => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const timeLeft = getTimeUntilExpiration(token);
      if (timeLeft && timeLeft < refreshThreshold) {
        const now = Date.now();
        const lastActivity = lastActivityRef.current;
        const activeRecently = now - lastActivity < refreshThreshold;

        if (activeRecently) {
          fetch("/api/refresh", {
            method: "POST",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.accessToken) {
                localStorage.setItem("access_token", data.token);
                setUser(data.user);
              } else {
                setSessionExpired(true);
              }
            })
            .catch(() => setSessionExpired(true));
        } else {
          setSessionExpired(true);
        }
      }
    }, 60000); // a cada 60 segundos

    return () => clearInterval(interval);
  }, [])

  return sessionExpired
}
