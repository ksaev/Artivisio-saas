"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"

const domaines = [
  "Technologie & Informatique",
  "Finance & Comptabilité",
  "Marketing & Communication",
  "Stratégie & Management",
  "Ressources humaines",
  "Juridique & Droit",
  "Santé & Médical",
  "Industrie & Production",
  "BTP & Construction",
  "Énergie & Environnement",
  "Transport & Logistique",
  "Commerce & Vente",
  "Éducation & Formation",
  "Art, Design & Médias",
  "Tourisme & Hôtellerie",
  "Agriculture & Agroalimentaire",
  "Fonction publique & Administration",
  "Humanitaire & Développement",
]

const typesDePoste = [
  "C-Level",
  "VP",
  "Directeur",
  "Responsable",
  "Cadre",
  "Technicien",
  "Employé",
  "Stagiaire"
]

const niveaux = [
  "Junior",
  "Intermédiaire",
  "Senior",
  "Manager",
  "Directeur",
  "Exécutif",
]

const anneesExperience = [
  "0-1 an",
  "2-3 ans",
  "4-5 ans",
  "6-10 ans",
  "Plus de 10 ans",
]

const niveauxEtudes = [
  "Aucun diplôme requis",
  "BEPC",
  "CAP/BEP",
  "Bac",
  "Bac +2 (BTS, DUT)",
  "Bac +3 (Licence, Bachelor)",
  "Bac +4",
  "Bac +5 (Master, Ingénieur)",
  "Doctorat",
]

export default function FormulaireOffre() {
  const [showToast, setShowToast] = useState(false)
  const [toastProgress, setToastProgress] = useState(100)
  const [toastStatus, setToastStatus] = useState("idle")

  const [form, setForm] = useState({
    titre: "",
    entreprise: "",
    localisation: "",
    typePoste: "",
    domaine: "",
    niveau: "",
    description: "",
    salaire: "",
    anneesExperience: "",
    niveauEtudes: "",
    dateLimite: "",
    datePublication: new Date().toISOString().split("T")[0],
    enAvant: false,
  })
    



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target

    if (target.type === "checkbox" && target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.value,
      }))
    }
  }

  const launchConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#a855f7", "#10b981"],
    })
  }

  useEffect(() => {
    if (toastStatus === "success") {
      let progress = 100
      const interval = setInterval(() => {
        progress -= 2.5
        setToastProgress(progress)
        if (progress <= 0) {
          clearInterval(interval)
          setShowToast(false)
          setToastStatus("idle")
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [toastStatus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setToastStatus("loading")
    setShowToast(true)

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Erreur serveur")

      const data = await res.json()
      setForm({
        titre: "",
        entreprise: "",
        localisation: "",
        typePoste: "",
        domaine: "",
        niveau: "",
        description: "",
        salaire: "",
        anneesExperience: "",
        niveauEtudes: "",
        dateLimite: "",
        datePublication: new Date().toISOString().split("T")[0],
        enAvant: false,
      })

      setToastStatus("success")
      setToastProgress(100)
      launchConfetti()
      console.log(data)
    } catch (error) {
      setToastStatus("error")
      console.error("Erreur d'envoi :", error)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-primary mb-6 justify-center text-center items-center">Ajouter une offre d'emploi</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="titre" className="block font-semibold text-primary mb-1">Titre du poste *</label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={form.titre}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="entreprise" className="block font-semibold text-primary mb-1">Entreprise *</label>
            <input
              type="text"
              id="entreprise"
              name="entreprise"
              value={form.entreprise}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="localisation" className="block font-semibold text-primary mb-1">Localisation *</label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              value={form.localisation}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="typePoste" className="block font-semibold text-primary mb-1">Type de poste *</label>
            <select
              id="typePoste"
              name="typePoste"
              value={form.typePoste}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Sélectionner --</option>
              {typesDePoste.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="domaine" className="block font-semibold text-primary mb-1">Domaine *</label>
            <select
              id="domaine"
              name="domaine"
              value={form.domaine}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Sélectionner --</option>
              {domaines.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="niveau" className="block font-semibold text-primary mb-1">Niveau de responsabilité *</label>
            <select
              id="niveau"
              name="niveau"
              value={form.niveau}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Sélectionner --</option>
              {niveaux.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="anneesExperience" className="block font-semibold text-primary mb-1">Années d'expérience *</label>
            <select
              id="anneesExperience"
              name="anneesExperience"
              value={form.anneesExperience}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Sélectionner --</option>
              {anneesExperience.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="niveauEtudes" className="block font-semibold text-primary mb-1">Niveau d'études *</label>
            <select
              id="niveauEtudes"
              name="niveauEtudes"
              value={form.niveauEtudes}
              onChange={handleChange}
              required
              className="w-full border-2 border-primary px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Sélectionner --</option>
              {niveauxEtudes.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 ">
     
            <label className="block font-semibold text-primary mb-1"
              > Date limite * </label>    
              <input type="date"
                name="dateLimite"
                value={form.dateLimite}
                min={form.datePublication}
                required
                onChange={handleChange}
                placeholder="Date limite de candidature"
                className="input w-full border-2 border-primary px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>


        <div>
          <label htmlFor="description" className="block font-semibold text-primary mb-1">Description *</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description de l'offre"
            required
            rows={5}
            className="w-full border-2 border-primary px-4 py-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="salaire"
            className="block font-semibold text-primary mb-1"
          >
            Salaire
          </label>
          <input
            type="text"
            id="salaire"
            name="salaire"
            value={form.salaire}
            placeholder="500.000 - 700.000 FCFA/Mois"
            onChange={handleChange}
            className="w-full border-2 border-primary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enAvant"
            name="enAvant"
            checked={form.enAvant}
            onChange={handleChange}
            className="w-5 h-5 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="enAvant" className="text-primary font-semibold">
            Mettre en avant
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary/90 transition"
        >
          Publier l'offre
        </button>
      </form>

      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white border border-primary px-6 py-3 rounded-lg shadow-md w-[90%] max-w-md">
          <span className="text-primary font-semibold flex items-center gap-2">
            {toastStatus === "loading" && "⏳ Envoi de l’offre en cours..."}
            {toastStatus === "success" && "🎉 Offre publiée avec succès !"}
            {toastStatus === "error" && "❌ Une erreur est survenue. Veuillez réessayer."}
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
    </>
  )
}
