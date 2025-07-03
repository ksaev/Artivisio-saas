"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AfterAuth() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role;

    if (role === "recruteur") {
      router.push("/recruteur");
    } else if (role === "candidat") {
      router.push("/candidat");
    } else {
      router.push("/onboarding");
    }
  }, [isLoaded, user]);

  return <p className="text-center mt-10">Redirection en cours...</p>;
}