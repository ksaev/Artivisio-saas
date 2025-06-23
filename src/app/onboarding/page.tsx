"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { user } = useUser();
  const router = useRouter();

  const handleSelectRole = async (role: string) => {
    if (!user) return;

    await user.update({
      unsafeMetadata: { role },
    });

    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">Choisissez votre rôle</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded m-2"
        onClick={() => handleSelectRole("recruteur")}
      >
        Je suis un recruteur
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded m-2"
        onClick={() => handleSelectRole("candidat")}
      >
        Je suis un candidat
      </button>
    </div>
  );
}
