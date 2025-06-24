"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Building, MapPin, DollarSign, Mail, Calendar, Copy, Check } from "lucide-react"
import Link from "next/link"
import { FloatingCard, PulsingElement } from "@/components/3d-animations"

export default function AjouterOffrePage() {
  const [formData, setFormData] = useState({
    titre: "",
    entreprise: "",
    localisation: "",
    salaire: "",
    typeContrat: "",
    description: "",
    emailRecruteur: "",
    datePublication: "",
    dateExpiration: "",
    competencesRequises: "",
    experienceRequise: "",
    niveauEtudes: "",
    siteWeb: "",
  })

  const [emailContent, setEmailContent] = useState({
    objet: "",
    corps: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [emailGenerated, setEmailGenerated] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEmailChange = (field: string, value: string) => {
    setEmailContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de la sauvegarde
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const generateEmailContent = () => {
    const objet = `Candidature pour le poste de ${formData.titre} chez ${formData.entreprise}`

    const corps = `Bonjour,

Je souhaite postuler au poste de ${formData.titre} au sein de ${formData.entreprise}.

Après avoir pris connaissance de l'offre d'emploi, je suis convaincu(e) que mon profil correspond aux compétences que vous recherchez, notamment en matière de ${formData.competencesRequises}.

Je possède une expérience significative dans ce domaine et je serais ravi(e) de pouvoir mettre mes compétences au service de votre entreprise.

Vous trouverez ci-joint mon CV et ma lettre de motivation détaillant mon parcours et mes réalisations.

Je reste à votre disposition pour un entretien afin de vous présenter ma candidature plus en détail.

Cordialement,
[Votre nom]`

    setEmailContent({
      objet,
      corps,
    })

    setEmailGenerated(true)
  }

  const getMailtoLink = () => {
    const subject = encodeURIComponent(emailContent.objet)
    const body = encodeURIComponent(emailContent.corps)
    return `mailto:${formData.emailRecruteur}?subject=${subject}&body=${body}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10 flex-1 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <PulsingElement>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-10 w-10 text-green-600" />
                </div>
              </PulsingElement>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Offre ajoutée avec succès !</h1>
              <p className="text-xl text-muted-foreground mb-8">
                L'offre pour le poste de {formData.titre} chez {formData.entreprise} a été enregistrée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/offres">Voir les offres</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                  <Link href="/candidatures/nouvelle">Créer une candidature</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/offres">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux offres
              </Link>
            </Button>
          </div>

          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Plus className="w-3 h-3 mr-1" />
              Nouvelle offre
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Ajouter une <span className="text-primary">offre d'emploi</span>
            </h1>
            <p className="text-muted-foreground">
              Enregistrez les détails d'une offre d'emploi et générez automatiquement un email de candidature
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations de l'offre */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Informations de l'offre
                    </CardTitle>
                    <CardDescription>Détails sur le poste et l'entreprise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="titre" className="block text-sm font-medium text-foreground mb-2">
                          Intitulé du poste *
                        </label>
                        <Input
                          id="titre"
                          value={formData.titre}
                          onChange={(e) => handleInputChange("titre", e.target.value)}
                          placeholder="Ex: Chief Technology Officer"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="entreprise" className="block text-sm font-medium text-foreground mb-2">
                          Entreprise *
                        </label>
                        <Input
                          id="entreprise"
                          value={formData.entreprise}
                          onChange={(e) => handleInputChange("entreprise", e.target.value)}
                          placeholder="Ex: FinTech Innovations CI"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="localisation" className="block text-sm font-medium text-foreground mb-2">
                          Localisation
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="localisation"
                            value={formData.localisation}
                            onChange={(e) => handleInputChange("localisation", e.target.value)}
                            placeholder="Ex: Abidjan, CI"
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="salaire" className="block text-sm font-medium text-foreground mb-2">
                          Salaire proposé
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="salaire"
                            value={formData.salaire}
                            onChange={(e) => handleInputChange("salaire", e.target.value)}
                            placeholder="Ex: Négociable"
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="typeContrat" className="block text-sm font-medium text-foreground mb-2">
                          Type de contrat
                        </label>
                        <Select
                          value={formData.typeContrat}
                          onValueChange={(value) => handleInputChange("typeContrat", value)}
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CDI">CDI</SelectItem>
                            <SelectItem value="CDD">CDD</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Consulting">Consulting</SelectItem>
                            <SelectItem value="Stage">Stage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                        Description du poste
                      </label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Décrivez les responsabilités et missions du poste..."
                        rows={4}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="emailRecruteur" className="block text-sm font-medium text-foreground mb-2">
                          Email du recruteur *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="emailRecruteur"
                            type="email"
                            value={formData.emailRecruteur}
                            onChange={(e) => handleInputChange("emailRecruteur", e.target.value)}
                            placeholder="recrutement@entreprise.com"
                            required
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="siteWeb" className="block text-sm font-medium text-foreground mb-2">
                          Site web de l'entreprise
                        </label>
                        <Input
                          id="siteWeb"
                          type="url"
                          value={formData.siteWeb}
                          onChange={(e) => handleInputChange("siteWeb", e.target.value)}
                          placeholder="https://www.entreprise.com"
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="datePublication" className="block text-sm font-medium text-foreground mb-2">
                          Date de publication
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="datePublication"
                            type="date"
                            value={formData.datePublication}
                            onChange={(e) => handleInputChange("datePublication", e.target.value)}
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="dateExpiration" className="block text-sm font-medium text-foreground mb-2">
                          Date d'expiration
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="dateExpiration"
                            type="date"
                            value={formData.dateExpiration}
                            onChange={(e) => handleInputChange("dateExpiration", e.target.value)}
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="niveauEtudes" className="block text-sm font-medium text-foreground mb-2">
                          Niveau d'études requis
                        </label>
                        <Select
                          value={formData.niveauEtudes}
                          onValueChange={(value) => handleInputChange("niveauEtudes", value)}
                        >
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bac">Bac</SelectItem>
                            <SelectItem value="Bac+2">Bac+2</SelectItem>
                            <SelectItem value="Bac+3">Bac+3</SelectItem>
                            <SelectItem value="Bac+5">Bac+5</SelectItem>
                            <SelectItem value="Doctorat">Doctorat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="competencesRequises" className="block text-sm font-medium text-foreground mb-2">
                        Compétences requises
                      </label>
                      <Textarea
                        id="competencesRequises"
                        value={formData.competencesRequises}
                        onChange={(e) => handleInputChange("competencesRequises", e.target.value)}
                        placeholder="Ex: Leadership, Gestion de projet, Développement web..."
                        rows={2}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="experienceRequise" className="block text-sm font-medium text-foreground mb-2">
                        Expérience requise
                      </label>
                      <Input
                        id="experienceRequise"
                        value={formData.experienceRequise}
                        onChange={(e) => handleInputChange("experienceRequise", e.target.value)}
                        placeholder="Ex: 5 ans minimum dans un poste similaire"
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* Génération d'email */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Générer un email de candidature
                    </CardTitle>
                    <CardDescription>
                      Créez automatiquement un email de candidature à partir des informations saisies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Button
                      type="button"
                      onClick={generateEmailContent}
                      className="bg-primary hover:bg-primary/90 w-full"
                      disabled={!formData.titre || !formData.entreprise || !formData.emailRecruteur}
                    >
                      Générer un email de candidature
                    </Button>

                    {emailGenerated && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="emailObjet" className="block text-sm font-medium text-foreground mb-2">
                            Objet de l'email
                          </label>
                          <div className="flex gap-2">
                            <Input
                              id="emailObjet"
                              value={emailContent.objet}
                              onChange={(e) => handleEmailChange("objet", e.target.value)}
                              className="border-primary/20 focus:border-primary flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => copyToClipboard(emailContent.objet)}
                              className="flex-shrink-0"
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="emailCorps" className="block text-sm font-medium text-foreground mb-2">
                            Corps de l'email
                          </label>
                          <div className="flex flex-col gap-2">
                            <Textarea
                              id="emailCorps"
                              value={emailContent.corps}
                              onChange={(e) => handleEmailChange("corps", e.target.value)}
                              rows={10}
                              className="border-primary/20 focus:border-primary"
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => copyToClipboard(emailContent.corps)}
                              >
                                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                Copier
                              </Button>
                              <Button type="button" asChild className="bg-primary hover:bg-primary/90">
                                <a href={getMailtoLink()} target="_blank" rel="noopener noreferrer">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Ouvrir dans Gmail
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4">
                <Button asChild variant="outline">
                  <Link href="/offres">Annuler</Link>
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer l'offre
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
