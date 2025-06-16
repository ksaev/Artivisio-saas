"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  ArrowLeft,
  Calendar,
  Video,
  MapPin,
  Phone,
  Clock,
  Plus,
  Edit,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Building,
} from "lucide-react"
import Link from "next/link"
import { FloatingCard, PulsingElement } from "@/components/3d-animations"
import { entretiens, candidatures, offres, type Entretien } from "@/lib/data-store"

// Simulation des candidatures de l'utilisateur connecté
const mesCandidatures = candidatures

export default function EntretiensPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [entretienForm, setEntretienForm] = useState({
    candidatureId: "",
    date: "",
    heure: "",
    lieu: "",
    lien: "",
    type: "visio" as "presentiel" | "visio" | "telephonique",
    message: "",
  })

  // Récupérer tous les entretiens liés aux candidatures de l'utilisateur
  const mesEntretiens = entretiens.filter((entretien) =>
    mesCandidatures.some((candidature) => candidature.id === entretien.candidatureId),
  )

  // Statistiques
  const stats = {
    total: mesEntretiens.length,
    aVenir: mesEntretiens.filter((e) => e.statut === "planifie" && new Date(e.date) > new Date()).length,
    passes: mesEntretiens.filter((e) => e.statut === "termine" || new Date(e.date) < new Date()).length,
    confirmes: mesEntretiens.filter((e) => e.statut === "confirme").length,
  }

  const handleSaveEntretien = () => {
    const nouvelEntretien: Entretien = {
      id: `ent_${Date.now()}`,
      candidatureId: entretienForm.candidatureId,
      candidatId: "current_user", // ID de l'utilisateur connecté
      recruteurId: "", // Pas de recruteur pour un entretien ajouté manuellement
      offreId: mesCandidatures.find((c) => c.id === entretienForm.candidatureId)?.offreId || "",
      date: entretienForm.date,
      heure: entretienForm.heure,
      lieu: entretienForm.lieu,
      lien: entretienForm.lien,
      type: entretienForm.type,
      message: entretienForm.message,
      statut: "planifie",
      creePar: "candidat",
      dateCreation: new Date().toISOString().split("T")[0],
    }

    // Ici on sauvegarderait en base de données
    console.log("Nouvel entretien ajouté:", nouvelEntretien)

    // Réinitialiser le formulaire
    setEntretienForm({
      candidatureId: "",
      date: "",
      heure: "",
      lieu: "",
      lien: "",
      type: "visio",
      message: "",
    })
    setShowAddDialog(false)
  }

  const getStatutBadge = (entretien: Entretien) => {
    const isUpcoming = new Date(entretien.date) > new Date()
    const isPast = new Date(entretien.date) < new Date()

    if (entretien.statut === "confirme") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmé</Badge>
    }
    if (entretien.statut === "reporte") {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Reporté</Badge>
    }
    if (entretien.statut === "annule") {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Annulé</Badge>
    }
    if (entretien.statut === "termine" || isPast) {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Terminé</Badge>
    }
    if (isUpcoming) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">À venir</Badge>
    }
    return <Badge variant="outline">Planifié</Badge>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "visio":
        return <Video className="h-4 w-4 text-blue-600" />
      case "presentiel":
        return <MapPin className="h-4 w-4 text-green-600" />
      case "telephonique":
        return <Phone className="h-4 w-4 text-purple-600" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getCandidatureInfo = (candidatureId: string) => {
    const candidature = mesCandidatures.find((c) => c.id === candidatureId)
    if (!candidature) return null

    const offre = offres.find((o) => o.id === candidature.offreId)
    return {
      poste: offre?.titre || "Poste inconnu",
      entreprise: offre?.entreprise || candidature.entreprise,
    }
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
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Calendar className="w-3 h-3 mr-1" />
                Gestion des Entretiens
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Mes <span className="text-primary">entretiens</span>
              </h1>
              <p className="text-muted-foreground">Suivez et gérez tous vos entretiens d'embauche</p>
            </div>
            <PulsingElement>
              <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un entretien
              </Button>
            </PulsingElement>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <FloatingCard>
              <Card className="border-primary/10 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </CardContent>
              </Card>
            </FloatingCard>
            <FloatingCard>
              <Card className="border-blue-200 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">{stats.aVenir}</div>
                  <div className="text-sm text-muted-foreground">À venir</div>
                </CardContent>
              </Card>
            </FloatingCard>
            <FloatingCard>
              <Card className="border-green-200 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">{stats.confirmes}</div>
                  <div className="text-sm text-muted-foreground">Confirmés</div>
                </CardContent>
              </Card>
            </FloatingCard>
            <FloatingCard>
              <Card className="border-gray-200 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-gray-600">{stats.passes}</div>
                  <div className="text-sm text-muted-foreground">Passés</div>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="tous" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-fit">
              <TabsTrigger value="tous">Tous les entretiens</TabsTrigger>
              <TabsTrigger value="a-venir">À venir</TabsTrigger>
              <TabsTrigger value="passes">Passés</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>

            {/* Tous les entretiens */}
            <TabsContent value="tous" className="space-y-6">
              {mesEntretiens.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun entretien planifié</h3>
                    <p className="text-muted-foreground mb-4">
                      Ajoutez vos entretiens manuellement ou ils apparaîtront automatiquement quand les recruteurs les
                      planifient.
                    </p>
                    <Button onClick={() => setShowAddDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter mon premier entretien
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {mesEntretiens
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entretien) => {
                      const candidatureInfo = getCandidatureInfo(entretien.candidatureId)
                      const isUpcoming = new Date(entretien.date) > new Date()

                      return (
                        <FloatingCard key={entretien.id}>
                          <Card className="border-primary/10">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-lg font-semibold">{candidatureInfo?.poste || "Entretien"}</h3>
                                    {getStatutBadge(entretien)}
                                    {entretien.creePar === "recruteur" && (
                                      <Badge variant="outline" className="text-xs">
                                        Planifié par le recruteur
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Building className="h-4 w-4" />
                                      {candidatureInfo?.entreprise}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(entretien.date).toLocaleDateString("fr-FR")} à {entretien.heure}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      {getTypeIcon(entretien.type)}
                                      {entretien.type === "visio" && entretien.lien ? (
                                        <a
                                          href={entretien.lien}
                                          className="hover:text-primary flex items-center gap-1"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          Rejoindre la visioconférence
                                          <ExternalLink className="h-3 w-3" />
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
                                  {isUpcoming && (
                                    <>
                                      <Button size="sm" variant="outline">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Modifier
                                      </Button>
                                      <Select
                                        value={entretien.statut}
                                        onValueChange={(newStatut) => {
                                          // Ici on mettrait à jour le statut
                                          console.log(`Changement statut entretien ${entretien.id}: ${newStatut}`)
                                        }}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="planifie">Planifié</SelectItem>
                                          <SelectItem value="confirme">Confirmé</SelectItem>
                                          <SelectItem value="reporte">Reporté</SelectItem>
                                          <SelectItem value="annule">Annulé</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </>
                                  )}
                                  {entretien.type === "visio" && entretien.lien && isUpcoming && (
                                    <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                                      <a href={entretien.lien} target="_blank" rel="noopener noreferrer">
                                        <Video className="h-4 w-4 mr-2" />
                                        Rejoindre
                                      </a>
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
              )}
            </TabsContent>

            {/* Entretiens à venir */}
            <TabsContent value="a-venir" className="space-y-6">
              <div className="space-y-4">
                {mesEntretiens
                  .filter((e) => new Date(e.date) > new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((entretien) => {
                    const candidatureInfo = getCandidatureInfo(entretien.candidatureId)
                    const joursRestants = Math.ceil(
                      (new Date(entretien.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                    )

                    return (
                      <FloatingCard key={entretien.id}>
                        <Card className="border-primary/10 border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-lg font-semibold">{candidatureInfo?.poste}</h3>
                                  {getStatutBadge(entretien)}
                                  {joursRestants <= 1 && (
                                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                      <AlertCircle className="h-3 w-3 mr-1" />
                                      {joursRestants === 0 ? "Aujourd'hui" : "Demain"}
                                    </Badge>
                                  )}
                                </div>

                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building className="h-4 w-4" />
                                    {candidatureInfo?.entreprise}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Dans {joursRestants} jour(s) - {entretien.heure}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {getTypeIcon(entretien.type)}
                                    {entretien.type === "visio"
                                      ? "Visioconférence"
                                      : entretien.type === "presentiel"
                                        ? "Présentiel"
                                        : "Téléphonique"}
                                  </div>
                                </div>

                                {entretien.message && (
                                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                      <strong>Instructions :</strong> {entretien.message}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col gap-2 ml-6">
                                {entretien.type === "visio" && entretien.lien && (
                                  <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                                    <a href={entretien.lien} target="_blank" rel="noopener noreferrer">
                                      <Video className="h-4 w-4 mr-2" />
                                      Rejoindre
                                    </a>
                                  </Button>
                                )}
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Confirmer
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingCard>
                    )
                  })}
              </div>

              {mesEntretiens.filter((e) => new Date(e.date) > new Date()).length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun entretien à venir</h3>
                    <p className="text-muted-foreground">Vos prochains entretiens apparaîtront ici.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

          {/* Entretiens passés */}
          <TabsContent value="passes" className="space-y-6">
            {mesEntretiens.filter((e) => new Date(e.date) <= new Date() || e.statut === "termine").length === 0 ? (
              <Card className="text-center py-12 border-primary/10">
                <CardContent>
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun entretien passé</h3>
                  <p className="text-muted-foreground mb-4">
                    Les entretiens s’affichent ici une fois la date passée ou leur statut marqué comme "terminé".
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {mesEntretiens
                  .filter((e) => new Date(e.date) <= new Date() || e.statut === "termine")
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entretien) => {
                    const candidatureInfo = getCandidatureInfo(entretien.candidatureId)

                    return (
                      <FloatingCard key={entretien.id}>
                        <Card className="border-primary/10 opacity-75">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-lg font-semibold">{candidatureInfo?.poste || "Entretien"}</h3>
                                  {getStatutBadge(entretien)}
                                  {entretien.creePar === "recruteur" && (
                                    <Badge variant="outline" className="text-xs">
                                      Planifié par le recruteur
                                    </Badge>
                                  )}
                                </div>

                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building className="h-4 w-4" />
                                    {candidatureInfo?.entreprise}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(entretien.date).toLocaleDateString("fr-FR")} à {entretien.heure}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {getTypeIcon(entretien.type)}
                                    {entretien.type === "visio" && entretien.lien ? (
                                      <a
                                        href={entretien.lien}
                                        className="hover:text-primary flex items-center gap-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Lien de visioconférence
                                        <ExternalLink className="h-3 w-3" />
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
                                  Ajouter notes
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingCard>
                    )
                  })}
              </div>
            )}
          </TabsContent>


            {/* Planning */}
            <TabsContent value="planning" className="space-y-6">
              <Card className="border-primary/10 text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Vue calendrier à venir</h3>
                  <p className="text-muted-foreground">
                    Une vue calendaire de vos entretiens sera prochainement disponible.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Dialog d'ajout d'entretien */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un entretien</DialogTitle>
            <DialogDescription>Ajoutez manuellement un entretien à votre planning</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="candidature">Candidature associée</Label>
              <Select
                value={entretienForm.candidatureId}
                onValueChange={(value) => setEntretienForm({ ...entretienForm, candidatureId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une candidature" />
                </SelectTrigger>
                <SelectContent>
                  {mesCandidatures.map((candidature) => {
                    const offre = offres.find((o) => o.id === candidature.offreId)
                    return (
                      <SelectItem key={candidature.id} value={candidature.id}>
                        {offre?.titre || candidature.poste} - {offre?.entreprise || candidature.entreprise}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

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
              <Label htmlFor="message">Notes personnelles</Label>
              <Textarea
                id="message"
                placeholder="Préparation, questions à poser, informations importantes..."
                value={entretienForm.message}
                onChange={(e) => setEntretienForm({ ...entretienForm, message: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEntretien}>Ajouter l'entretien</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
