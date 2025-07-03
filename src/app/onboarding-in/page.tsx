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

    router.push(`/${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen via-primary-300 bg-gradient-to-b from-primary-500 to-primary">
      <div className="p-10 max-w-md mx-auto text-center bg-primary text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Choisissez votre rôle</h2>
        <button
          className="bg-red-600 text-white px-5 py-3 text-xl rounded m-2"
          onClick={() => handleSelectRole("register/recruteur")}
        >
          Je suis un recruteur
        </button>
        <button
          className="bg-green-600 text-white px-5 py-3 text-xl rounded m-2"
          onClick={() => handleSelectRole("register/candidat")}
        >
          Je suis un candidat
        </button>
      </div>
    </div>
  );
}
