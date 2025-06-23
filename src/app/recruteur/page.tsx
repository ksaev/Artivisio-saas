"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Building, Users, Calendar, Eye, Mail, Phone, FileText, Plus, Edit, Video, MapPin } from "lucide-react"
import { FloatingCard } from "@/components/3d-animations"
import {
  offres,
  candidatures,
  recruteurs,
  getCandidatsByOffre,
  getOffresByRecruteur,
  getEntretiensByRecruteur,
  type Candidat,
  type Entretien,
} from "@/lib/data-store"

// ID du recruteur connecté (simulé)
const CURRENT_RECRUTEUR_ID = "rec_1"

export default function RecruteurPage() {
  const [selectedOffre, setSelectedOffre] = useState<string>("")
  const [showEntretienDialog, setShowEntretienDialog] = useState(false)
  const [selectedCandidat, setSelectedCandidat] = useState<Candidat | null>(null)
  const [entretienForm, setEntretienForm] = useState({
    date: "",
    heure: "",
    lieu: "",
    lien: "",
    type: "visio" as "presentiel" | "visio" | "telephonique",
    message: "",
  })

  // Données du recruteur connecté
  const recruteur = recruteurs.find((r) => r.id === CURRENT_RECRUTEUR_ID)
  const mesOffres = getOffresByRecruteur(CURRENT_RECRUTEUR_ID)
  const mesEntretiens = getEntretiensByRecruteur(CURRENT_RECRUTEUR_ID)

  // Candidats pour l'offre sélectionnée
  const candidatsOffre = selectedOffre ? getCandidatsByOffre(selectedOffre) : []

  // Statistiques
  const stats = {
    offresActives: mesOffres.filter((o) => o.statut === "active").length,
    totalCandidats: mesOffres.reduce((total, offre) => total + getCandidatsByOffre(offre.id).length, 0),
    entretiensAPlanifier: candidatures.filter((c) => mesOffres.some((o) => o.id === c.offreId) && c.statut === "nouveau")
      .length,
    entretiensAVenir: mesEntretiens.filter((e) => e.statut === "planifie" && new Date(e.date) > new Date()).length,
  }

  const handlePlanifierEntretien = (candidat: Candidat) => {
    setSelectedCandidat(candidat)
    setShowEntretienDialog(true)
  }

  const handleSaveEntretien = () => {
    if (!selectedCandidat) return

    const nouvelEntretien: Entretien = {
      id: `ent_${Date.now()}`,
      candidatureId: selectedCandidat.id, // Lien avec la candidature
      candidatId: selectedCandidat.id,
      recruteurId: CURRENT_RECRUTEUR_ID,
      offreId: selectedCandidat.offreId,
      date: entretienForm.date,
      heure: entretienForm.heure,
      lieu: entretienForm.lieu,
      lien: entretienForm.lien,
      type: entretienForm.type,
      message: entretienForm.message,
      statut: "planifie",
      creePar: "recruteur",
      dateCreation: new Date().toISOString().split("T")[0],
    }

    // Ici on sauvegarderait en base de données
    console.log("Nouvel entretien créé:", nouvelEntretien)

    // Réinitialiser le formulaire
    setEntretienForm({
      date: "",
      heure: "",
      lieu: "",
      lien: "",
      type: "visio",
      message: "",
    })
    setShowEntretienDialog(false)
    setSelectedCandidat(null)
  }

  const getStatutBadge = (statut: string) => {
    const statutMap = {
      nouveau: { label: "Nouveau", color: "bg-blue-100 text-blue-800 border-blue-200" },
      en_cours: { label: "En cours", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      entretien_planifie: { label: "Entretien planifié", color: "bg-green-100 text-green-800 border-green-200" },
      refuse: { label: "Refusé", color: "bg-red-100 text-red-800 border-red-200" },
      accepte: { label: "Accepté", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    }
    const info = statutMap[statut as keyof typeof statutMap] || statutMap.nouveau
    return <Badge className={info.color}>{info.label}</Badge>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "visio":
        return <Video className="h-4 w-4" />
      case "presentiel":
        return <MapPin className="h-4 w-4" />
      case "telephonique":
        return <Phone className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Building className="w-3 h-3 mr-1" />
                Espace Recruteur
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Bonjour <span className="text-primary">{recruteur?.nom}</span> !
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Gérez vos offres d'emploi et suivez vos candidatures
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{recruteur?.poste}</p>
              <p className="font-medium">{recruteur?.entreprise}</p>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <FloatingCard>
              <Card className="border-primary/10 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{stats.offresActives}</div>
                  <div className="text-sm text-muted-foreground">Offres actives</div>
                </CardContent>
              </Card>
            </FloatingCard>
            <FloatingCard>
              <Card className="border-blue-200 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalCandidats}</div>
                  <div className="text-sm text-muted-foreground">Candidatures</div>
                </CardContent>
              </Card>
            </FloatingCard>
            <FloatingCard>
              <Card className="border-yellow-200 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-600">{stats.entretiensAPlanifier}</div>
                  <div className="text-sm text-muted-foreground">À traiter</div>
                </CardContent>
              </Card>
            </FloatingCard>
            <FloatingCard>
              <Card className="border-green-200 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">{stats.entretiensAVenir}</div>
                  <div className="text-sm text-muted-foreground">Entretiens à venir</div>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="candidatures" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit">
              <TabsTrigger value="candidatures">Candidats</TabsTrigger>
              <TabsTrigger value="offres">Mes Offres</TabsTrigger>
              <TabsTrigger value="entretiens">Entretiens</TabsTrigger>
            </TabsList>

            {/* Gestion des candidatures */}
            <TabsContent value="candidatures" className="space-y-6">
              {/* Sélection d'offre */}
              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="offre-select" className="text-sm font-medium">
                      Sélectionner une offre :
                    </Label>
                    <Select value={selectedOffre} onValueChange={setSelectedOffre}>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Choisir une offre" />
                      </SelectTrigger>
                      <SelectContent>
                        {mesOffres.map((offre) => (
                          <SelectItem key={offre.id} value={offre.id}>
                            {offre.titre} - {offre.entreprise}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des candidatures */}
              {selectedOffre ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      Candidats pour "{mesOffres.find((o) => o.id === selectedOffre)?.titre}"
                    </h2>
                    <Badge variant="outline">{candidatsOffre.length} candidature(s)</Badge>
                  </div>

                  {candidatsOffre.length === 0 ? (
                    <Card className="text-center py-12">
                      <CardContent>
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Aucun candidat pour cette offre</h3>
                        <p className="text-muted-foreground">
                          Les candidatures apparaîtront ici dès qu'elles seront reçues.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-6">
                      {candidatsOffre.map((candidat) => (
                        <FloatingCard key={candidat.id}>
                          <Card className="border-primary/10">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-lg font-semibold">{candidat.nom}</h3>
                                    {getStatutBadge(candidat.statut)}
                                  </div>

                                  <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Mail className="h-4 w-4" />
                                      <a href={`mailto:${candidat.email}`} className="hover:text-primary">
                                        {candidat.email}
                                      </a>
                                    </div>
                                    {candidat.telephone && (
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <a href={`tel:${candidat.telephone}`} className="hover:text-primary">
                                          {candidat.telephone}
                                        </a>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Calendar className="h-4 w-4" />
                                      Candidature du {new Date(candidat.dateCandidature).toLocaleDateString("fr-FR")}
                                    </div>
                                  </div>

                                  <div className="bg-muted/50 p-3 rounded-lg">
                                    <p className="text-sm text-foreground line-clamp-3">{candidat.message}</p>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 ml-6">
                                  {candidat.cv && (
                                    <Button size="sm" variant="outline">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Voir CV
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    onClick={() => handlePlanifierEntretien(candidat)}
                                    className="bg-primary hover:bg-primary/90"
                                  >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Planifier entretien
                                  </Button>
                                  <Select
                                    value={candidat.statut}
                                    onValueChange={(newStatut) => {
                                      // Ici on mettrait à jour le statut en base
                                      console.log(`Changement statut ${candidat.id}: ${newStatut}`)
                                    }}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="nouveau">Nouveau</SelectItem>
                                      <SelectItem value="en_cours">En cours</SelectItem>
                                      <SelectItem value="entretien_planifie">Entretien planifié</SelectItem>
                                      <SelectItem value="refuse">Refusé</SelectItem>
                                      <SelectItem value="accepte">Accepté</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </FloatingCard>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Sélectionnez une offre</h3>
                    <p className="text-muted-foreground">
                      Choisissez une offre d'emploi pour voir les candidatures reçues.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Mes offres */}
            <TabsContent value="offres" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Mes Offres d'Emploi</h2>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                  Nouvelle offre
                </Button>
              </div>

              <div className="grid gap-6">
                {mesOffres.map((offre) => {
                  const nbCandidats = getCandidatsByOffre(offre.id).length
                  return (
                    <FloatingCard key={offre.id}>
                      <Card className="border-primary/10">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-semibold">{offre.titre}</h3>
                                <Badge variant={offre.statut === "active" ? "default" : "secondary"}>
                                  {offre.statut === "active" ? "Active" : "Fermée"}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Building className="h-4 w-4" />
                                  {offre.entreprise}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  {offre.localisation}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  Publiée le {new Date(offre.datePublication).toLocaleDateString("fr-FR")}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground line-clamp-2">{offre.description}</p>
                            </div>

                            <div className="flex flex-col gap-2 ml-6 text-right">
                              <div className="text-2xl font-bold text-primary">{nbCandidats}</div>
                              <div className="text-sm text-muted-foreground">candidature(s)</div>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </Button>
                              <Button size="sm" onClick={() => setSelectedOffre(offre.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Voir candidatures
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </FloatingCard>
                  )
                })}
              </div>
            </TabsContent>

            {/* Entretiens */}
            <TabsContent value="entretiens" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Mes Entretiens</h2>
                <Badge variant="outline">{mesEntretiens.length} entretien(s)</Badge>
              </div>

              <div className="grid gap-6">
                {mesEntretiens.map((entretien) => {
                  const candidat = candidatures.find((c) => c.id === entretien.candidatId)
                  const offre = offres.find((o) => o.id === entretien.offreId)
                  const isUpcoming = new Date(entretien.date) > new Date()

                  return (
                    <FloatingCard key={entretien.id}>
                      <Card className="border-primary/10">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-semibold">{candidat?.nom}</h3>
                                <Badge variant={isUpcoming ? "default" : "secondary"}>{entretien.statut}</Badge>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Building className="h-4 w-4" />
                                  {offre?.titre}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(entretien.date).toLocaleDateString("fr-FR")} à {entretien.heure}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  {getTypeIcon(entretien.type)}
                                  {entretien.type === "visio" && entretien.lien ? (
                                    <a href={entretien.lien} className="hover:text-primary">
                                      {entretien.lien}
                                    </a>
                                  ) : entretien.lieu ? (
                                    entretien.lieu
                                  ) : (
                                    entretien.type
                                  )}
                                </div>
                              </div>

                              {entretien.message && (
                                <div className="bg-muted/50 p-3 rounded-lg">
                                  <p className="text-sm text-foreground">{entretien.message}</p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-2 ml-6">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </Button>
                              {candidat?.email && (
                                <Button size="sm" variant="outline">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Contacter
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </FloatingCard>
                  )
                })}
              </div>

              {mesEntretiens.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun entretien planifié</h3>
                    <p className="text-muted-foreground">Les entretiens que vous planifiez apparaîtront ici.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Dialog de planification d'entretien */}
      <Dialog open={showEntretienDialog} onOpenChange={setShowEntretienDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Planifier un entretien</DialogTitle>
            <DialogDescription>Planifier un entretien avec {selectedCandidat?.nom}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={entretienForm.date}
                  onChange={(e) => setEntretienForm({ ...entretienForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heure">Heure</Label>
                <Input
                  id="heure"
                  type="time"
                  value={entretienForm.heure}
                  onChange={(e) => setEntretienForm({ ...entretienForm, heure: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type d'entretien</Label>
              <Select
                value={entretienForm.type}
                onValueChange={(value: "presentiel" | "visio" | "telephonique") =>
                  setEntretienForm({ ...entretienForm, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visio">Visioconférence</SelectItem>
                  <SelectItem value="presentiel">Présentiel</SelectItem>
                  <SelectItem value="telephonique">Téléphonique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {entretienForm.type === "visio" && (
              <div className="space-y-2">
                <Label htmlFor="lien">Lien de visioconférence</Label>
                <Input
                  id="lien"
                  placeholder="https://meet.google.com/..."
                  value={entretienForm.lien}
                  onChange={(e) => setEntretienForm({ ...entretienForm, lien: e.target.value })}
                />
              </div>
            )}

            {entretienForm.type === "presentiel" && (
              <div className="space-y-2">
                <Label htmlFor="lieu">Lieu</Label>
                <Input
                  id="lieu"
                  placeholder="Adresse du rendez-vous"
                  value={entretienForm.lieu}
                  onChange={(e) => setEntretienForm({ ...entretienForm, lieu: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message pour le candidat</Label>
              <Textarea
                id="message"
                placeholder="Instructions, préparation requise, durée prévue..."
                value={entretienForm.message}
                onChange={(e) => setEntretienForm({ ...entretienForm, message: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEntretienDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEntretien}>Planifier l'entretien</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
