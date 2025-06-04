'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Footer } from "../Footer/Footer";
import Inicio from "../InicioComponent/Inicio";
import { Navbar } from "../Navbar/Navbar";
import { ResourcesSection } from "../ResourcesSection/ResourcesSection";
import { Section } from "../Section/Section";
import { CircularProgress } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: Props) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null // Previna hydration issues

  const isAuthPage = 
    pathname === "/login" || 
    pathname === "/register" ||
    pathname === "/forgot-password" || 
    pathname === "/nfe-emitir" ||
    pathname === "/nfce-emitir";
    pathname === "/cte-emitir" ||
    pathname === "/mdfe-emitir";
    
  if (isAuthPage) return <>{children}</>;

  return (
    <>
      <Navbar />

      {!user ? (
        <>
          <Section />
          <ResourcesSection />
        </>
      ) : (
        <Inicio>{children}</Inicio>
      )}

      <Footer />
    </>
  );
}
