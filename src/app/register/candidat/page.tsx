"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FloatingCard } from "@/components/3d-animations";
// @ts-ignore
import countryList from "react-select-country-list";
import { useState, useMemo, useRef, useEffect } from "react";
import ReactSelect from "react-select";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import confetti from "canvas-confetti";

export default function RegisterPage() {
  const [phone, setPhone] = useState<string>("");
  const [pays, setPays] = useState<{ label: string; value: string } | null>(
    null
  );
  const paysOptions = useMemo(() => countryList().getData(), []);
  const router = useRouter();
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastProgress, setToastProgress] = useState(100);
  const [toastStatus, setToastStatus] = useState("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const launchConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#a855f7", "#10b981"],
    });
  };

  useEffect(() => {
    if (toastStatus === "success") {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#a855f7", "#10b981"],
      });

      let progress = 100;
      const interval = setInterval(() => {
        progress -= 2.5;
        setToastProgress(progress);
        if (progress <= 0) {
          clearInterval(interval);
          setShowToast(false);
          setToastStatus("idle");
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toastStatus]);

  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    poste: "",
    experience: "",
    secteur: "",
    objectif: "",
    propagande: "",
  });

  const [errors, setErrors] = useState({
    poste: false,
    experience: false,
    secteur: false,
    objectif: false,
    propagande: false,
  });

  const validateForm = () => {
    const newErrors = {
      poste: formData.poste === "",
      experience: formData.experience === "",
      secteur: formData.secteur === "",
      objectif: formData.objectif === "",
      propagande: formData.propagande === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setToastStatus("loading");
    setShowToast(true);

    const nativeValidation = formRef.current?.checkValidity();
    if (!nativeValidation || !validateForm()) {
      formRef.current?.reportValidity();
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setError("Entrez un numéro de téléphone valide.");
      return;
    }

    // Succès
    setToastStatus("success");
    setToastProgress(1000);
    launchConfetti();
    console.log(formData);

    // ⏳ attendre 2 secondes avant redirection
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000); // temps en millisecondes
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-inherit bg-gradient-to-tl via-primary from-primary/5 to-accent/10">
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-10 flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <FloatingCard>
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle>Complétez vos informations</CardTitle>
                  <CardDescription>
                    Quelques détails pour bien démarrer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Prénom(s)
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="firstName"
                            required
                            placeholder="Prénom(s)"
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Nom
                        </label>
                        <Input
                          id="lastName"
                          placeholder="Nom"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email de contact secondaire (optionnel)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="votre.email@entreprise.com"
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Pays de résidence
                        </label>
                        {mounted && (
                          <ReactSelect
                            options={paysOptions}
                            value={pays}
                            isSearchable
                            required
                            onChange={setPays}
                            placeholder="Sélectionnez un pays"
                            isClearable
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                paddingLeft: "0.4rem",
                                paddingRight: "0.4rem",
                                paddingTop: "0.1rem",
                                paddingBottom: "0.1rem",
                                border: state.isFocused
                                  ? "1px solid #3b82f6"
                                  : "1px solid rgba(139, 69, 19, 0.2)",
                                borderRadius: "8px",
                                boxShadow: "none",
                                minHeight: "38px",
                                fontSize: "0.875rem",
                                transition: "border-color 0.2s ease-in-out",
                              }),
                            }}
                          />
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Numéro de téléphone
                        </label>
                        <PhoneInput
                          defaultCountry="ci"
                          value={phone}
                          onChange={(value) => {
                            setPhone(value);
                            setError("");
                          }}
                          className="w-full"
                          style={{
                            border: "1px solid rgba(139, 69, 19, 0.2)",
                            borderRadius: "8px",
                            padding: "1px",
                            transition: "border-color 0.2s ease-in-out",
                          }}
                          onFocus={() => {
                            const el = document.querySelector(
                              ".react-international-phone-input-container"
                            ) as HTMLElement;
                            if (el) el.style.borderColor = "#3b82f6";
                          }}
                          onBlur={() => {
                            const el = document.querySelector(
                              ".react-international-phone-input-container"
                            ) as HTMLElement;
                            if (el)
                              el.style.borderColor = "rgba(139, 69, 19, 0.2)";
                          }}
                          inputProps={{
                            required: true,
                            placeholder: "Ex: +225 01 02 03 04 05",
                            style: {
                              border: "none",
                              outline: "none",
                              fontSize: "0.875rem",
                              paddingLeft: "0.5rem",
                              width: "100%",
                            },
                          }}
                        />
                        {error && (
                          <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Poste actuel
                        </label>
                        <Select
                          value={formData.poste}
                          onValueChange={(val) => handleChange("poste", val)}
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Sélectionnez votre statut actuel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sans_emploi">
                              Sans emploi
                            </SelectItem>
                            <SelectItem value="etudiant">
                              Étudiant(e)
                            </SelectItem>
                            <SelectItem value="freelance">
                              Freelance / Indépendant(e)
                            </SelectItem>
                            <SelectItem value="stagiaire">Stagiaire</SelectItem>
                            <SelectItem value="employe">Employé(e)</SelectItem>
                            <SelectItem value="technicien">
                              Technicien(ne)
                            </SelectItem>
                            <SelectItem value="cadre">Cadre</SelectItem>
                            <SelectItem value="manager">
                              Manager / Chef d'équipe
                            </SelectItem>
                            <SelectItem value="directeur">
                              Directeur(trice)
                            </SelectItem>
                            <SelectItem value="entrepreneur">
                              Entrepreneur / Fondateur(trice)
                            </SelectItem>
                            <SelectItem value="reconversion">
                              En reconversion
                            </SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.poste && (
                          <p className="text-sm text-red-500">
                            Ce champ est requis
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Années d'expérience
                        </label>
                        <Select
                          value={formData.experience}
                          onValueChange={(val) =>
                            handleChange("experience", val)
                          }
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Sélectionnez votre expérience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 ans</SelectItem>
                            <SelectItem value="3-5">3-5 ans</SelectItem>
                            <SelectItem value="6-10">6-10 ans</SelectItem>
                            <SelectItem value="11-15">11-15 ans</SelectItem>
                            <SelectItem value="15+">15+ ans</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience && (
                          <p className="text-sm text-red-500">
                            Ce champ est requis
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Secteur d'activité
                        </label>
                        <Select
                          value={formData.secteur}
                          onValueChange={(val) => handleChange("secteur", val)}
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Choisissez un secteur" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">
                              Technologie / Informatique
                            </SelectItem>
                            <SelectItem value="finance">
                              Finance / Comptabilité
                            </SelectItem>
                            <SelectItem value="sante">
                              Santé / Médical
                            </SelectItem>
                            <SelectItem value="education">
                              Éducation / Formation
                            </SelectItem>
                            <SelectItem value="industrie">
                              Industrie / BTP
                            </SelectItem>
                            <SelectItem value="logistique">
                              Transport / Logistique
                            </SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.secteur && (
                          <p className="text-sm text-red-500">
                            Ce champ est requis
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="linkedin"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Lien LinkedIn (optionnel)
                        </label>
                        <Input
                          id="linkedin"
                          placeholder="https://www.linkedin.com/in/..."
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Objectif ou besoin principal
                        </label>
                        <Select
                          value={formData.objectif}
                          onValueChange={(val) => handleChange("objectif", val)}
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Pourquoi vous inscrivez-vous ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emploi">
                              Trouver un emploi
                            </SelectItem>
                            <SelectItem value="coaching">
                              Bénéficier de coaching
                            </SelectItem>
                            <SelectItem value="reseau">
                              Développer mon réseau
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.objectif && (
                          <p className="text-sm text-red-500">
                            Ce champ est requis
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Comment avez-vous entendu parler de nous ?
                        </label>
                        <Select
                          value={formData.propagande}
                          onValueChange={(val) =>
                            handleChange("propagande", val)
                          }
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Choisissez une source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reseaux">
                              Réseaux sociaux
                            </SelectItem>
                            <SelectItem value="moteur_recherche">
                              Google / Moteur de recherche
                            </SelectItem>
                            <SelectItem value="bouche_a_oreille">
                              Bouche à oreille
                            </SelectItem>
                            <SelectItem value="partenaire">
                              Partenaire / Événement
                            </SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.propagande && (
                          <p className="text-sm text-red-500">
                            Ce champ est requis
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 text-sm">
                      <input type="checkbox" className="mt-1" required />
                      <span className="text-muted-foreground">
                        J'accepte les{" "}
                        <Link
                          href="/conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link
                          href="/politique"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          politique de confidentialité
                        </Link>
                      </span>
                    </div>

                    <div>
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 top-8"
                      >
                        Finaliser mon inscription
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                  {showToast && (
                    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white border border-primary px-6 py-3 rounded-lg shadow-md w-[90%] max-w-md">
                      <span className="text-primary font-semibold flex items-center gap-2">
                        {toastStatus === "loading" &&
                          "‼️Veuillez remplir tous les champs !!!"}
                        {toastStatus === "success" &&
                          "🎉 Inscription terminé !!!"}
                        {toastStatus === "error" &&
                          "❌ Une erreur est survenue. Veuillez réessayer."}
                      </span>
                      {toastStatus == "error" && (
                        <div className="relative mt-2 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-primary rounded-full transition-all duration-100 ease-linear"
                            style={{ width: `${toastProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </div>
      </section>
    </div>
  );
}
