"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Footer } from "../Footer/Footer";
import Inicio from "../InicioComponent/Inicio";
import { Navbar } from "../Navbar/Navbar";
import { ResourcesSection } from "../ResourcesSection/ResourcesSection";
import { Section } from "../Section/Section";



interface Props {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: Props) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if(isAuthPage) return <>{children}</>
  return (
    <>
      {!isAuthPage && <Navbar />}

      {!user ? (
        <>
          <Section />
          <ResourcesSection />
        </>
      ) : (
        <Inicio>{children}</Inicio>
      )}

      {!isAuthPage && <Footer />}
    </>
  );
}
