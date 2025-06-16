"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Save,
  Plus,
  Building,
  MapPin,
  DollarSign,
  Mail,
  FileText,
  Copy,
  Check,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { FloatingCard, PulsingElement } from "@/components/3d-animations"
import { useSearchParams } from "next/navigation"

// Simulation des données d'offres
const jobs = [
  {
    id: "1",
    poste: "Chief Technology Officer",
    entreprise: "FinTech Innovations CI",
    lienOffre: "/offres/cto-fintech-innovations-ci",
    localisation: "Abidjan, CI",
    salaire: "Négociable + Equity",
    typeContrat: "CDI",
    description: "Diriger la transformation digitale d'une fintech en pleine croissance",
    emailRecruteur: "recrutement@fintech-innovations.ci",
  },
  {
    id: "2",
    poste: "VP Strategy & Operations",
    entreprise: "Investment Group SN",
    lienOffre: "/offres/vp-strategy-operations-sn",
    localisation: "Dakar, SN",
    salaire: "Package premium",
    typeContrat: "CDI",
    description: "Superviser les opérations financières d'un groupe d'investissement",
    emailRecruteur: "careers@investment-group.sn",
  },
]

// Templates de candidature prédéfinis
const defaultTemplates = [
  {
    id: "template-1",
    nom: "Candidature Classique",
    objet: "Candidature pour le poste de {poste} chez {entreprise}",
    corps: `Bonjour,

Je souhaite postuler au poste de {poste} au sein de {entreprise}.

Après avoir pris connaissance de l'offre d'emploi, je suis convaincu(e) que mon profil correspond aux compétences que vous recherchez.

Je possède une expérience significative dans ce domaine et je serais ravi(e) de pouvoir mettre mes compétences au service de votre entreprise.

Vous trouverez ci-joint mon CV et ma lettre de motivation détaillant mon parcours et mes réalisations.

Je reste à votre disposition pour un entretien afin de vous présenter ma candidature plus en détail.

Cordialement,
[Votre nom]`,
    type: "predefined",
  },
  {
    id: "template-2",
    nom: "Candidature Executive",
    objet: "Candidature Executive - {poste} | {entreprise}",
    corps: `Madame, Monsieur,

En tant que professionnel expérimenté dans le secteur, je suis particulièrement intéressé(e) par le poste de {poste} au sein de {entreprise}.

Mon parcours de [X années] dans des fonctions de direction m'a permis de développer une expertise approfondie en leadership stratégique et en transformation organisationnelle.

Les défis que représente ce poste correspondent parfaitement à mes aspirations professionnelles et à mon désir de contribuer au développement d'une organisation d'excellence.

Je serais honoré(e) de pouvoir échanger avec vous sur la manière dont mon expérience pourrait bénéficier à {entreprise}.

Très cordialement,
[Votre nom]
[Votre titre actuel]`,
    type: "predefined",
  },
  {
    id: "template-3",
    nom: "Candidature Spontanée",
    objet: "Candidature spontanée - Profil {domaine}",
    corps: `Bonjour,

Passionné(e) par le secteur d'activité de {entreprise}, je me permets de vous adresser ma candidature spontanée.

Mon profil de [votre profil] et mon expérience de [X années] dans [domaine d'expertise] pourraient apporter une valeur ajoutée à vos équipes.

Je suis particulièrement attiré(e) par [mentionner un aspect spécifique de l'entreprise] et je serais ravi(e) de contribuer à vos projets de développement.

Je reste à votre disposition pour un entretien et vous remercie de l'attention que vous porterez à ma candidature.

Cordialement,
[Votre nom]`,
    type: "predefined",
  },
]

export default function NouvelleCandidaturePage() {
  const searchParams = useSearchParams()
  const offreId = searchParams.get("offre")

  const [activeTab, setActiveTab] = useState("existante")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customTemplates, setCustomTemplates] = useState([])
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)

  // Données du formulaire de candidature
  const [formData, setFormData] = useState({
    poste: "",
    entreprise: "",
    lienOffre: "",
    localisation: "",
    salaire: "",
    typeContrat: "",
    statut: "en_attente",
    messageEnvoye: "",
    notesPersonnelles: "",
    contactRH: {
      nom: "",
      email: "",
      telephone: "",
    },
  })

  // Données du formulaire de création d'offre
  const [offreData, setOffreData] = useState({
    titre: "",
    entreprise: "",
    localisation: "",
    salaire: "",
    typeContrat: "",
    description: "",
    emailRecruteur: "",
    competencesRequises: "",
    experienceRequise: "",
  })

  // Template personnalisé
  const [templateData, setTemplateData] = useState({
    nom: "",
    objet: "",
    corps: "",
  })

  const [emailContent, setEmailContent] = useState({
    objet: "",
    corps: "",
  })

  // Pré-remplir le formulaire si une offre est spécifiée
  useEffect(() => {
    if (offreId) {
      const offre = jobs.find((job) => job.id === offreId)
      if (offre) {
        setFormData({
          ...formData,
          poste: offre.poste,
          entreprise: offre.entreprise,
          lienOffre: offre.lienOffre,
          localisation: offre.localisation,
          salaire: offre.salaire,
          typeContrat: offre.typeContrat,
          contactRH: {
            ...formData.contactRH,
            email: offre.emailRecruteur,
          },
        })
        setActiveTab("existante")
      }
    }
  }, [offreId])

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("contactRH.")) {
      const contactField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        contactRH: {
          ...prev.contactRH,
          [contactField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleOffreInputChange = (field: string, value: string) => {
    setOffreData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTemplateInputChange = (field: string, value: string) => {
    setTemplateData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de la sauvegarde
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const copyOffreToForm = () => {
    setFormData({
      ...formData,
      poste: offreData.titre,
      entreprise: offreData.entreprise,
      localisation: offreData.localisation,
      salaire: offreData.salaire,
      typeContrat: offreData.typeContrat,
      contactRH: {
        ...formData.contactRH,
        email: offreData.emailRecruteur,
      },
    })
    setActiveTab("candidature")
  }

  const applyTemplate = (template) => {
    const poste = formData.poste || offreData.titre
    const entreprise = formData.entreprise || offreData.entreprise

    const objet = template.objet.replace(/{poste}/g, poste).replace(/{entreprise}/g, entreprise)

    const corps = template.corps
      .replace(/{poste}/g, poste)
      .replace(/{entreprise}/g, entreprise)
      .replace(/{domaine}/g, "votre domaine")

    setEmailContent({ objet, corps })
    setFormData((prev) => ({ ...prev, messageEnvoye: corps }))
  }

  const saveCustomTemplate = () => {
    if (templateData.nom && templateData.objet && templateData.corps) {
      const newTemplate = {
        id: `custom-${Date.now()}`,
        ...templateData,
        type: "custom",
      }
      setCustomTemplates((prev) => [...prev, newTemplate])
      setTemplateData({ nom: "", objet: "", corps: "" })
      setShowTemplateDialog(false)
    }
  }

  const deleteCustomTemplate = (templateId) => {
    setCustomTemplates((prev) => prev.filter((t) => t.id !== templateId))
  }

  const editCustomTemplate = (template) => {
    setTemplateData({
      nom: template.nom,
      objet: template.objet,
      corps: template.corps,
    })
    setEditingTemplate(template.id)
    setShowTemplateDialog(true)
  }

  const updateCustomTemplate = () => {
    setCustomTemplates((prev) => prev.map((t) => (t.id === editingTemplate ? { ...t, ...templateData } : t)))
    setTemplateData({ nom: "", objet: "", corps: "" })
    setEditingTemplate(null)
    setShowTemplateDialog(false)
  }

  const getMailtoLink = () => {
    const email = formData.contactRH.email || offreData.emailRecruteur
    const subject = encodeURIComponent(emailContent.objet)
    const body = encodeURIComponent(emailContent.corps)
    return `mailto:${email}?subject=${subject}&body=${body}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allTemplates = [...defaultTemplates, ...customTemplates]

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
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Candidature créée avec succès !</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Votre candidature pour {formData.poste || offreData.titre} chez{" "}
                {formData.entreprise || offreData.entreprise} a été enregistrée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/candidatures">Voir mes candidatures</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                  <Link href="/candidatures/nouvelle">Créer une autre candidature</Link>
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
              <Link href="/candidatures">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux candidatures
              </Link>
            </Button>
          </div>

          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Plus className="w-3 h-3 mr-1" />
              Nouvelle candidature
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Créer une <span className="text-primary">candidature</span>
            </h1>
            <p className="text-muted-foreground">
              Créez une offre ou utilisez une offre existante, puis personnalisez votre candidature
            </p>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="existante">Offre existante</TabsTrigger>
                <TabsTrigger value="nouvelle">Créer une offre</TabsTrigger>
                <TabsTrigger value="candidature">Ma candidature</TabsTrigger>
              </TabsList>

              {/* Offre existante */}
              <TabsContent value="existante" className="space-y-6">
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Sélectionner une offre existante</CardTitle>
                      <CardDescription>Choisissez une offre pour laquelle vous souhaitez postuler</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {jobs.map((job) => (
                        <div
                          key={job.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.poste === job.poste
                              ? "border-primary bg-primary/5"
                              : "border-primary/10 hover:border-primary/30"
                          }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              poste: job.poste,
                              entreprise: job.entreprise,
                              lienOffre: job.lienOffre,
                              localisation: job.localisation,
                              salaire: job.salaire,
                              typeContrat: job.typeContrat,
                              contactRH: {
                                ...formData.contactRH,
                                email: job.emailRecruteur,
                              },
                            })
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-foreground">{job.poste}</h3>
                              <p className="text-muted-foreground">{job.entreprise}</p>
                              <p className="text-sm text-muted-foreground">{job.localisation}</p>
                            </div>
                            <Badge variant="outline">{job.typeContrat}</Badge>
                          </div>
                        </div>
                      ))}

                      {formData.poste && (
                        <div className="flex justify-end">
                          <Button
                            onClick={() => setActiveTab("candidature")}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Continuer avec cette offre
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </FloatingCard>
              </TabsContent>

              {/* Créer une nouvelle offre */}
              <TabsContent value="nouvelle" className="space-y-6">
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Créer une nouvelle offre
                      </CardTitle>
                      <CardDescription>Saisissez les détails de l'offre d'emploi</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="titre" className="block text-sm font-medium text-foreground mb-2">
                            Intitulé du poste *
                          </label>
                          <Input
                            id="titre"
                            value={offreData.titre}
                            onChange={(e) => handleOffreInputChange("titre", e.target.value)}
                            placeholder="Ex: Chief Technology Officer"
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="entreprise" className="block text-sm font-medium text-foreground mb-2">
                            Entreprise *
                          </label>
                          <Input
                            id="entreprise"
                            value={offreData.entreprise}
                            onChange={(e) => handleOffreInputChange("entreprise", e.target.value)}
                            placeholder="Ex: FinTech Innovations CI"
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
                              value={offreData.localisation}
                              onChange={(e) => handleOffreInputChange("localisation", e.target.value)}
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
                              value={offreData.salaire}
                              onChange={(e) => handleOffreInputChange("salaire", e.target.value)}
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
                            value={offreData.typeContrat}
                            onValueChange={(value) => handleOffreInputChange("typeContrat", value)}
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
                        <label htmlFor="emailRecruteur" className="block text-sm font-medium text-foreground mb-2">
                          Email du recruteur *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="emailRecruteur"
                            type="email"
                            value={offreData.emailRecruteur}
                            onChange={(e) => handleOffreInputChange("emailRecruteur", e.target.value)}
                            placeholder="recrutement@entreprise.com"
                            className="pl-10 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                          Description du poste
                        </label>
                        <Textarea
                          id="description"
                          value={offreData.description}
                          onChange={(e) => handleOffreInputChange("description", e.target.value)}
                          placeholder="Décrivez les responsabilités et missions du poste..."
                          rows={4}
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={copyOffreToForm} className="bg-primary hover:bg-primary/90">
                          Utiliser cette offre pour ma candidature
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>
              </TabsContent>

              {/* Ma candidature */}
              <TabsContent value="candidature" className="space-y-6">
                {/* Templates de candidature */}
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Templates de candidature
                          </CardTitle>
                          <CardDescription>Utilisez un modèle prédéfini ou créez le vôtre</CardDescription>
                        </div>
                        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Nouveau template
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                {editingTemplate ? "Modifier le template" : "Créer un nouveau template"}
                              </DialogTitle>
                              <DialogDescription>
                                Créez un modèle de candidature réutilisable avec des variables personnalisables
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Nom du template
                                </label>
                                <Input
                                  value={templateData.nom}
                                  onChange={(e) => handleTemplateInputChange("nom", e.target.value)}
                                  placeholder="Ex: Ma candidature personnalisée"
                                  className="border-primary/20 focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Objet de l'email
                                </label>
                                <Input
                                  value={templateData.objet}
                                  onChange={(e) => handleTemplateInputChange("objet", e.target.value)}
                                  placeholder="Ex: Candidature pour {poste} chez {entreprise}"
                                  className="border-primary/20 focus:border-primary"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Variables disponibles: {"{poste}"}, {"{entreprise}"}
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Corps de l'email
                                </label>
                                <Textarea
                                  value={templateData.corps}
                                  onChange={(e) => handleTemplateInputChange("corps", e.target.value)}
                                  placeholder="Votre message de candidature..."
                                  rows={8}
                                  className="border-primary/20 focus:border-primary"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Variables disponibles: {"{poste}"}, {"{entreprise}"}, {"{domaine}"}
                                </p>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowTemplateDialog(false)
                                    setEditingTemplate(null)
                                    setTemplateData({ nom: "", objet: "", corps: "" })
                                  }}
                                >
                                  Annuler
                                </Button>
                                <Button onClick={editingTemplate ? updateCustomTemplate : saveCustomTemplate}>
                                  {editingTemplate ? "Modifier" : "Créer"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        {allTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedTemplate === template.id
                                ? "border-primary bg-primary/5"
                                : "border-primary/10 hover:border-primary/30"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div
                                className="flex-1"
                                onClick={() => {
                                  setSelectedTemplate(template.id)
                                  applyTemplate(template)
                                }}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-foreground">{template.nom}</h3>
                                  <Badge variant={template.type === "predefined" ? "default" : "secondary"}>
                                    {template.type === "predefined" ? "Prédéfini" : "Personnel"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{template.objet}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{template.corps}</p>
                              </div>
                              {template.type === "custom" && (
                                <div className="flex gap-1 ml-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      editCustomTemplate(template)
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteCustomTemplate(template.id)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>

                {/* Formulaire de candidature */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations du poste */}
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle>Informations du poste</CardTitle>
                        <CardDescription>Vérifiez et complétez les informations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Poste</label>
                            <Input
                              value={formData.poste}
                              onChange={(e) => handleInputChange("poste", e.target.value)}
                              className="border-primary/20 focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Entreprise</label>
                            <Input
                              value={formData.entreprise}
                              onChange={(e) => handleInputChange("entreprise", e.target.value)}
                              className="border-primary/20 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email du recruteur</label>
                          <Input
                            type="email"
                            value={formData.contactRH.email}
                            onChange={(e) => handleInputChange("contactRH.email", e.target.value)}
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </FloatingCard>

                  {/* Message de candidature */}
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle>Message de candidature</CardTitle>
                        <CardDescription>Personnalisez votre message</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Objet</label>
                          <div className="flex gap-2">
                            <Input
                              value={emailContent.objet}
                              onChange={(e) => setEmailContent((prev) => ({ ...prev, objet: e.target.value }))}
                              className="border-primary/20 focus:border-primary flex-1"
                            />
                            <Button type="button" variant="outline" onClick={() => copyToClipboard(emailContent.objet)}>
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                          <Textarea
                            value={emailContent.corps || formData.messageEnvoye}
                            onChange={(e) => {
                              setEmailContent((prev) => ({ ...prev, corps: e.target.value }))
                              handleInputChange("messageEnvoye", e.target.value)
                            }}
                            rows={10}
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => copyToClipboard(emailContent.corps || formData.messageEnvoye)}
                          >
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            Copier
                          </Button>
                          {(formData.contactRH.email || offreData.emailRecruteur) && (
                            <Button type="button" asChild className="bg-primary hover:bg-primary/90">
                              <a href={getMailtoLink()} target="_blank" rel="noopener noreferrer">
                                <Mail className="h-4 w-4 mr-2" />
                                Postuler via Gmail
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </FloatingCard>

                  {/* Notes personnelles */}
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle>Notes personnelles</CardTitle>
                        <CardDescription>Vos observations sur cette candidature</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={formData.notesPersonnelles}
                          onChange={(e) => handleInputChange("notesPersonnelles", e.target.value)}
                          placeholder="Vos observations, impressions, points à retenir..."
                          rows={4}
                          className="border-primary/20 focus:border-primary"
                        />
                      </CardContent>
                    </Card>
                  </FloatingCard>

                  {/* Boutons d'action */}
                  <div className="flex justify-end gap-4">
                    <Button asChild variant="outline">
                      <Link href="/candidatures">Annuler</Link>
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer la candidature
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
