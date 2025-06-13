"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Building,
  Calendar,
  ExternalLink,
  Edit,
  Save,
  FileText,
  Clock,
  MessageSquare,
  History,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { FloatingCard } from "@/components/3d-animations"

// Simulation des données d'une candidature
const candidatureData = {
  id: "1",
  poste: "Chief Technology Officer",
  entreprise: "FinTech Innovations CI",
  lienOffre: "/offres/cto-fintech-innovations-ci",
  dateCandidature: "2024-01-15",
  statut: "entretien_prevu",
  joursDepuisCandidature: 5,
  salaire: "Négociable + Equity",
  localisation: "Abidjan, CI",
  typeContrat: "CDI",
  description:
    "Poste de direction technique pour une fintech en pleine croissance. Responsabilité de l'équipe tech (15 personnes) et de la stratégie technologique.",
  messageEnvoye:
    "Bonjour,\n\nJe suis très intéressé par le poste de CTO au sein de votre entreprise. Mon expérience de 10 ans dans le secteur fintech et ma connaissance du marché africain me permettraient d'apporter une valeur ajoutée significative à votre équipe.\n\nCordialement,\nJohn Doe",
  notesPersonnelles:
    "Entreprise très prometteuse, équipe jeune et dynamique. Salaire négociable, possibilité d'equity intéressante. Contact RH très réactif.",
  contactRH: {
    nom: "Sarah Kouassi",
    email: "s.kouassi@fintech-innovations.ci",
    telephone: "+225 07 08 09 10 11",
  },
}

const historiqueStatuts = [
  {
    date: "2024-01-20",
    statut: "entretien_prevu",
    description: "Entretien programmé pour le 25 janvier à 14h00",
    auteur: "Système",
  },
  {
    date: "2024-01-17",
    statut: "en_attente",
    description: "Accusé de réception de la candidature",
    auteur: "Sarah Kouassi (RH)",
  },
  {
    date: "2024-01-15",
    statut: "en_attente",
    description: "Candidature envoyée",
    auteur: "Vous",
  },
]

const getStatusInfo = (statut: string) => {
  const statusMap = {
    en_attente: {
      label: "En attente de réponse",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: "🟡",
    },
    entretien_prevu: {
      label: "Entretien prévu",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: "🟢",
    },
    entretien_passe: {
      label: "Entretien passé",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "🔵",
    },
    refusee: {
      label: "Refusée",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: "🔴",
    },
    pas_de_retour: {
      label: "Pas de retour",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: "⚫",
    },
    embauche: {
      label: "Embauché",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: "✅",
    },
  }
  return statusMap[statut as keyof typeof statusMap]
}

export default function CandidatureDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(candidatureData.notesPersonnelles)
  const [statut, setStatut] = useState(candidatureData.statut)

  const statusInfo = getStatusInfo(statut)

  const handleSave = () => {
    // Ici on sauvegarderait les modifications
    setIsEditing(false)
    // Simulation d'une sauvegarde
    console.log("Sauvegarde:", { notes, statut })
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

          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={statusInfo.color}>
                  {statusInfo.icon} {statusInfo.label}
                </Badge>
                <Badge variant="outline" className="border-primary/20">
                  {candidatureData.typeContrat}
                </Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{candidatureData.poste}</h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {candidatureData.entreprise}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Candidature du {new Date(candidatureData.dateCandidature).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={candidatureData.lienOffre}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Voir l'offre
                </Link>
              </Button>
              {isEditing ? (
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="message">Message envoyé</TabsTrigger>
                  <TabsTrigger value="historique">Historique</TabsTrigger>
                </TabsList>

                {/* Détails de la candidature */}
                <TabsContent value="details" className="space-y-6">
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Informations du poste
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Localisation</label>
                            <p className="text-foreground">{candidatureData.localisation}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Salaire</label>
                            <p className="text-foreground">{candidatureData.salaire}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Type de contrat</label>
                            <p className="text-foreground">{candidatureData.typeContrat}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Jours depuis candidature
                            </label>
                            <p className="text-foreground">{candidatureData.joursDepuisCandidature} jours</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Description</label>
                          <p className="text-foreground mt-1">{candidatureData.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </FloatingCard>

                  {/* Notes personnelles */}
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          Notes personnelles
                        </CardTitle>
                        <CardDescription>Vos observations et remarques sur cette candidature</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isEditing ? (
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Ajoutez vos notes personnelles..."
                            rows={6}
                            className="border-primary/20 focus:border-primary"
                          />
                        ) : (
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-foreground whitespace-pre-wrap">{notes || "Aucune note ajoutée"}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </FloatingCard>
                </TabsContent>

                {/* Message envoyé */}
                <TabsContent value="message">
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          Message de candidature
                        </CardTitle>
                        <CardDescription>Le message que vous avez envoyé avec votre candidature</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                          <p className="text-foreground whitespace-pre-wrap">{candidatureData.messageEnvoye}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </FloatingCard>
                </TabsContent>

                {/* Historique */}
                <TabsContent value="historique">
                  <FloatingCard>
                    <Card className="border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <History className="h-5 w-5 text-primary" />
                          Historique des statuts
                        </CardTitle>
                        <CardDescription>Évolution de votre candidature dans le temps</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {historiqueStatuts.map((item, index) => {
                            const itemStatusInfo = getStatusInfo(item.statut)
                            return (
                              <div key={index} className="flex gap-4 p-3 border border-primary/10 rounded-lg">
                                <div className="flex-shrink-0">
                                  <Badge className={itemStatusInfo.color} variant="outline">
                                    {itemStatusInfo.icon}
                                  </Badge>
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium text-sm">{itemStatusInfo.label}</h4>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(item.date).toLocaleDateString("fr-FR")}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                                  <p className="text-xs text-muted-foreground">Par {item.auteur}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </FloatingCard>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Modifier le statut */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Statut de la candidature</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <Select value={statut} onValueChange={setStatut}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en_attente">🟡 En attente de réponse</SelectItem>
                          <SelectItem value="entretien_prevu">🟢 Entretien prévu</SelectItem>
                          <SelectItem value="entretien_passe">🔵 Entretien passé</SelectItem>
                          <SelectItem value="refusee">🔴 Refusée</SelectItem>
                          <SelectItem value="pas_de_retour">⚫ Pas de retour</SelectItem>
                          <SelectItem value="embauche">✅ Embauché</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={statusInfo.color} variant="outline">
                        {statusInfo.icon} {statusInfo.label}
                      </Badge>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Il y a {candidatureData.joursDepuisCandidature} jours
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* Contact RH */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact RH</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">{candidatureData.contactRH.nom}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${candidatureData.contactRH.email}`} className="text-primary hover:underline">
                        {candidatureData.contactRH.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${candidatureData.contactRH.telephone}`} className="text-primary hover:underline">
                        {candidatureData.contactRH.telephone}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* Actions rapides */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer une relance
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Programmer un rappel
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Exporter en PDF
                    </Button>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
