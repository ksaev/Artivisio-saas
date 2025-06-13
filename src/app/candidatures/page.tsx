"use client"

import Link from "next/link"
import { FloatingCard, PulsingElement } from "@/components/3d-animations"
import { BarChart, DonutChart, LineChart, MetricCard, ProgressRing } from "@/components/charts"
import { entretiens } from "@/lib/data-store"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Eye,
  Calendar,
  Building,
  Clock,
  TrendingUp,
  FileText,
  ExternalLink,
  Mail,
  Settings,
  ChevronDown,
  Check,
  ChevronsUpDown,
  BarChart3,
  Activity,
  Target,
  CheckCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"



// Types pour les candidatures
interface Statut {
  id: string
  nom: string
  couleur: string
  description: string
  ordre: number
  type: "system" | "custom"
}

interface Candidature {
  id: string
  poste: string
  entreprise: string
  lienOffre: string
  dateCandidature: string
  statut: string
  joursDepuisCandidature: number
  salaire?: string
  localisation: string
  typeContrat: string
  notesPersonnelles?: string
  messageEnvoye?: string
  contactRH?: {
    nom?: string
    email?: string
    telephone?: string
  }
}

interface Entretien {
  id: string
  candidatureId: string
  date: string
  heure: string
  notes?: string
}

// Statuts par défaut du système
const defaultStatuts: Statut[] = [
  {
    id: "postule",
    nom: "Postulé",
    couleur: "#FBBF24", // Jaune
    description: "Candidature envoyée, en attente de réponse",
    ordre: 1,
    type: "system",
  },
  {
    id: "entretien",
    nom: "Entretien prévu",
    couleur: "#34D399", // Vert
    description: "Un entretien a été programmé",
    ordre: 2,
    type: "system",
  },
  {
    id: "entretien_passe",
    nom: "Entretien passé",
    couleur: "#60A5FA", // Bleu
    description: "L'entretien a eu lieu, en attente de retour",
    ordre: 3,
    type: "system",
  },
  {
    id: "relance",
    nom: "Relance effectuée",
    couleur: "#A78BFA", // Violet
    description: "Une relance a été envoyée",
    ordre: 4,
    type: "system",
  },
  {
    id: "refus",
    nom: "Refusé",
    couleur: "#EF4444", // Rouge
    description: "Candidature refusée par l'entreprise",
    ordre: 5,
    type: "system",
  },
  {
    id: "accepte",
    nom: "Accepté",
    couleur: "#10B981", // Vert foncé
    description: "Candidature acceptée, offre reçue",
    ordre: 6,
    type: "system",
  },
  {
    id: "sans_reponse",
    nom: "Sans réponse",
    couleur: "#9CA3AF", // Gris
    description: "Aucune réponse après un certain temps",
    ordre: 7,
    type: "system",
  },
]

// Données de candidatures simulées
const candidatures: Candidature[] = [
  {
    id: "1",
    poste: "Chief Technology Officer",
    entreprise: "FinTech Innovations CI",
    lienOffre: "/offres/cto-fintech-innovations-ci",
    dateCandidature: "2024-01-15",
    statut: "entretien",
    joursDepuisCandidature: 5,
    salaire: "Négociable + Equity",
    localisation: "Abidjan, CI",
    typeContrat: "CDI",
    notesPersonnelles:
      "Entreprise très prometteuse, équipe jeune et dynamique. Salaire négociable, possibilité d'equity intéressante.",
    contactRH: {
      nom: "Sarah Kouassi",
      email: "s.kouassi@fintech-innovations.ci",
      telephone: "+225 07 08 09 10 11",
    },
  },
  {
    id: "2",
    poste: "VP Strategy & Operations",
    entreprise: "Investment Group SN",
    lienOffre: "/offres/vp-strategy-operations-sn",
    dateCandidature: "2024-01-10",
    statut: "postule",
    joursDepuisCandidature: 10,
    salaire: "Package premium",
    localisation: "Dakar, SN",
    typeContrat: "CDI",
    notesPersonnelles: "Poste intéressant avec responsabilités importantes. Prévoir relance la semaine prochaine.",
  },
  {
    id: "3",
    poste: "Senior Strategy Consultant",
    entreprise: "McKinsey & Company BF",
    lienOffre: "/offres/senior-strategy-consultant-bf",
    dateCandidature: "2024-01-08",
    statut: "entretien_passe",
    joursDepuisCandidature: 12,
    salaire: "Très attractif",
    localisation: "Ouagadougou, BF",
    typeContrat: "Consulting",
    notesPersonnelles: "Entretien s'est bien passé, attente de retour d'ici fin de semaine.",
  },
  {
    id: "4",
    poste: "Directeur Marketing Digital",
    entreprise: "Orange Digital CI",
    lienOffre: "/offres/directeur-marketing-digital-ci",
    dateCandidature: "2024-01-05",
    statut: "refus",
    joursDepuisCandidature: 15,
    salaire: "Excellent package",
    localisation: "Abidjan, CI",
    typeContrat: "CDI",
    notesPersonnelles: "Refus reçu par email. Raison: profil ne correspondant pas exactement aux attentes.",
  },
  {
    id: "5",
    poste: "Head of Operations",
    entreprise: "Ecobank Regional",
    lienOffre: "/offres/head-operations-ecobank",
    dateCandidature: "2023-12-20",
    statut: "sans_reponse",
    joursDepuisCandidature: 26,
    salaire: "Compétitif",
    localisation: "Lomé, TG",
    typeContrat: "CDI",
  },
  {
    id: "6",
    poste: "Senior Legal Counsel",
    entreprise: "International Law Firm",
    lienOffre: "/offres/senior-legal-counsel-bj",
    dateCandidature: "2024-01-12",
    statut: "accepte",
    joursDepuisCandidature: 8,
    salaire: "Package attractif",
    localisation: "Cotonou, BJ",
    typeContrat: "CDI",
    notesPersonnelles: "Offre reçue! Négociation salariale en cours.",
  },
  {
    id: "7",
    poste: "Directeur Technique Senior",
    entreprise: "TechCorp Premium CI",
    lienOffre: "/offres/directeur-technique-senior-ci",
    dateCandidature: "2024-01-18",
    statut: "relance",
    joursDepuisCandidature: 2,
    salaire: "À négocier",
    localisation: "Abidjan, CI",
    typeContrat: "CDI",
    notesPersonnelles: "Relance effectuée par téléphone, RH doit revenir vers moi.",
  },
  {
    id: "8",
    poste: "Product Manager Senior",
    entreprise: "Digital Solutions Mali",
    lienOffre: "/offres/product-manager-senior-ml",
    dateCandidature: "2024-01-03",
    statut: "postule",
    joursDepuisCandidature: 17,
    salaire: "Compétitif",
    localisation: "Bamako, ML",
    typeContrat: "CDI",
  },
  {
    id: "9",
    poste: "Data Science Lead",
    entreprise: "Analytics Corp BF",
    lienOffre: "/offres/data-science-lead-bf",
    dateCandidature: "2024-01-01",
    statut: "entretien",
    joursDepuisCandidature: 19,
    salaire: "Très attractif",
    localisation: "Ouagadougou, BF",
    typeContrat: "CDI",
  },
  {
    id: "10",
    poste: "Business Development Director",
    entreprise: "Growth Partners SN",
    lienOffre: "/offres/business-development-director-sn",
    dateCandidature: "2023-12-28",
    statut: "entretien_passe",
    joursDepuisCandidature: 23,
    salaire: "Package premium",
    localisation: "Dakar, SN",
    typeContrat: "CDI",
  },
]


export default function CandidaturesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatut, setSelectedStatut] = useState("tous")
  const [selectedEntreprise, setSelectedEntreprise] = useState("toutes")
  const [sortBy, setSortBy] = useState("date_desc")
  const [viewMode, setViewMode] = useState<"cards" | "table">("table")
  const [statuts, setStatuts] = useState<Statut[]>([...defaultStatuts])
  const [customStatuts, setCustomStatuts] = useState<Statut[]>([])

  

// Fonction pour obtenir les informations de statut
const getStatutInfo = (statutId: string, statuts: Statut[]): Statut => {
  const statut = statuts.find((s) => s.id === statutId)
  if (!statut) {
    return {
      id: "inconnu",
      nom: "Inconnu",
      couleur: "#9CA3AF",
      description: "Statut inconnu",
      ordre: Number.MAX_SAFE_INTEGER,
      type: "system",
    }
  }
  return statut
}


  // Simuler le chargement des statuts personnalisés depuis une API
  useEffect(() => {
    // Dans une vraie application, cela viendrait d'une API
    const savedCustomStatuts: Statut[] = [
      {
        id: "custom_1",
        nom: "Deuxième entretien",
        couleur: "#8B5CF6",
        description: "Convoqué pour un deuxième entretien",
        ordre: 8,
        type: "custom",
      },
      {
        id: "custom_2",
        nom: "Test technique",
        couleur: "#EC4899",
        description: "Test technique à réaliser",
        ordre: 9,
        type: "custom",
      },
    ]

    setCustomStatuts(savedCustomStatuts)
    setStatuts([...defaultStatuts, ...savedCustomStatuts])
  }, [])

  // Filtrage et tri des candidatures
  const filteredCandidatures = candidatures
    .filter((candidature) => {
      const matchesSearch =
        candidature.poste.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidature.entreprise.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatut = selectedStatut === "tous" || candidature.statut === selectedStatut

      const matchesEntreprise = selectedEntreprise === "toutes" || candidature.entreprise === selectedEntreprise

      return matchesSearch && matchesStatut && matchesEntreprise
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date_desc":
          return new Date(b.dateCandidature).getTime() - new Date(a.dateCandidature).getTime()
        case "date_asc":
          return new Date(a.dateCandidature).getTime() - new Date(b.dateCandidature).getTime()
        case "entreprise":
          return a.entreprise.localeCompare(b.entreprise)
        case "poste":
          return a.poste.localeCompare(b.poste)
        case "statut":
          const statutA = getStatutInfo(a.statut, statuts)
          const statutB = getStatutInfo(b.statut, statuts)
          return statutA.ordre - statutB.ordre
        default:
          return 0
      }
    })

  // Statistiques
  const stats = {
    total: candidatures.length,
    enAttente: candidatures.filter((c) => c.statut === "postule").length,
    entretiens: candidatures.filter((c) => c.statut === "entretien" || c.statut === "entretien_passe").length,
    refusees: candidatures.filter((c) => c.statut === "refus").length,
    acceptees: candidatures.filter((c) => c.statut === "accepte").length,
    sansReponse: candidatures.filter((c) => c.statut === "sans_reponse").length,
    relances: candidatures.filter((c) => c.statut === "relance").length,
  }

  // Données pour les graphiques
  const statutsData = statuts
    .map((statut) => ({
      label: statut.nom,
      value: candidatures.filter((c) => c.statut === statut.id).length,
      color: statut.couleur,
    }))
    .filter((item) => item.value > 0)

  const entreprisesData = Array.from(new Set(candidatures.map((c) => c.entreprise)))
    .map((entreprise) => ({
      label: entreprise,
      value: candidatures.filter((c) => c.entreprise === entreprise).length,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const evolutionData = [
    { label: "Déc", value: 2, date: "2023-12" },
    { label: "Jan", value: 8, date: "2024-01" },
    { label: "Fév", value: 0, date: "2024-02" },
  ]

  // Entreprises uniques pour le filtre
  const entreprises = Array.from(new Set(candidatures.map((c) => c.entreprise)))

  // Générer un lien mailto pour une candidature
  const getMailtoLink = (candidature: Candidature) => {
    if (!candidature.contactRH?.email) return "#"

    const subject = encodeURIComponent(
      `Candidature pour le poste de ${candidature.poste} chez ${candidature.entreprise}`,
    )
    const body = encodeURIComponent(candidature.messageEnvoye || "")
    return `mailto:${candidature.contactRH.email}?subject=${subject}&body=${body}`
  }

  // Calculer le taux de réussite
  const tauxReussite = stats.total > 0 ? Math.round(((stats.acceptees + stats.entretiens) / stats.total) * 100) : 0
  const tauxReponse = stats.total > 0 ? Math.round(((stats.total - stats.sansReponse) / stats.total) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                <FileText className="w-3 h-3 mr-1" />
                Suivi des Candidatures
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Mes <span className="text-primary">candidatures</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Suivez l'évolution de toutes vos candidatures en un seul endroit
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/candidatures/statuts">
                  <Settings className="h-4 w-4 mr-2" />
                  Gérer les statuts
                </Link>
              </Button>
              <PulsingElement>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/candidatures/nouvelle">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle candidature
                  </Link>
                </Button>
              </PulsingElement>
            </div>
          </div>

          {/* Métriques principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Total candidatures"
              value={stats.total}
              change={{ value: 25, type: "increase", period: "ce mois" }}
              icon={<FileText className="h-6 w-6" />}
              color="#3B82F6"
            />
            <MetricCard
              title="Taux de réponse"
              value={`${tauxReponse}%`}
              change={{ value: 12, type: "increase", period: "ce mois" }}
              icon={<Activity className="h-6 w-6" />}
              color="#10B981"
            />
            <MetricCard
              title="Entretiens obtenus"
              value={stats.entretiens}
              change={{ value: 8, type: "increase", period: "ce mois" }}
              icon={<Calendar className="h-6 w-6" />}
              color="#F59E0B"
            />
            <MetricCard
              title="Taux de réussite"
              value={`${tauxReussite}%`}
              change={{ value: 5, type: "increase", period: "ce mois" }}
              icon={<Target className="h-6 w-6" />}
              color="#EF4444"
            />
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="liste" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 lg:w-fit">
              <TabsTrigger value="liste">Liste des candidatures</TabsTrigger>
              <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
              <TabsTrigger value="entretiens">Entretiens</TabsTrigger>
              <TabsTrigger value="tableau">Tableau de bord</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Liste des candidatures */}
            <TabsContent value="liste" className="space-y-6">
              {/* Filtres et recherche */}
              <Card className="border-primary/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Rechercher un poste ou entreprise..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Select value={selectedStatut} onValueChange={setSelectedStatut}>
                        <SelectTrigger className="border-primary/20 focus:border-primary w-[180px]">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tous">Tous les statuts</SelectItem>
                          {statuts.map((statut) => (
                            <SelectItem key={statut.id} value={statut.id}>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statut.couleur }} />
                                {statut.nom}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedEntreprise} onValueChange={setSelectedEntreprise}>
                        <SelectTrigger className="border-primary/20 focus:border-primary w-[180px]">
                          <SelectValue placeholder="Entreprise" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toutes">Toutes les entreprises</SelectItem>
                          {entreprises.map((entreprise) => (
                            <SelectItem key={entreprise} value={entreprise}>
                              {entreprise}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="border-primary/20 focus:border-primary w-[180px]">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date_desc">Date (récent)</SelectItem>
                          <SelectItem value="date_asc">Date (ancien)</SelectItem>
                          <SelectItem value="entreprise">Entreprise</SelectItem>
                          <SelectItem value="poste">Poste</SelectItem>
                          <SelectItem value="statut">Statut</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === "cards" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setViewMode("cards")}
                          className="h-10 w-10"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "table" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setViewMode("table")}
                          className="h-10 w-10"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des candidatures */}
              {filteredCandidatures.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucune candidature trouvée</h3>
                    <p className="text-muted-foreground mb-4">
                      Modifiez vos critères de recherche ou ajoutez une nouvelle candidature.
                    </p>
                    <Button asChild>
                      <Link href="/candidatures/nouvelle">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une candidature
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : viewMode === "cards" ? (
                <div className="space-y-4">
                  {filteredCandidatures.map((candidature) => {
                    const statutInfo = getStatutInfo(candidature.statut, statuts)
                    return (
                      <FloatingCard key={candidature.id}>
                        <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge
                                    className="flex items-center gap-1"
                                    style={{
                                      backgroundColor: `${statutInfo.couleur}20`,
                                      color: statutInfo.couleur,
                                      borderColor: `${statutInfo.couleur}40`,
                                    }}
                                  >
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: statutInfo.couleur }}
                                    />
                                    {statutInfo.nom}
                                  </Badge>
                                  {candidature.joursDepuisCandidature > 21 && candidature.statut === "postule" && (
                                    <Badge variant="outline" className="border-orange-200 text-orange-600">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {candidature.joursDepuisCandidature} jours
                                    </Badge>
                                  )}
                                </div>

                                <h3 className="text-lg font-semibold text-foreground mb-2">{candidature.poste}</h3>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center gap-1">
                                    <Building className="h-4 w-4" />
                                    {candidature.entreprise}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(candidature.dateCandidature).toLocaleDateString("fr-FR")}
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-muted-foreground">{candidature.localisation}</span>
                                  <span className="text-primary font-medium">{candidature.salaire}</span>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2 ml-4">
                                <Button asChild size="sm">
                                  <Link href={`/candidatures/${candidature.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Détails
                                  </Link>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      Actions
                                      <ChevronDown className="h-4 w-4 ml-1" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={candidature.lienOffre}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Voir l'offre
                                      </Link>
                                    </DropdownMenuItem>
                                    {candidature.contactRH?.email && (
                                      <DropdownMenuItem asChild>
                                        <a href={getMailtoLink(candidature)}>
                                          <Mail className="h-4 w-4 mr-2" />
                                          Envoyer un email
                                        </a>
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                                    {statuts.map((statut) => (
                                      <DropdownMenuItem
                                        key={statut.id}
                                        className="flex items-center gap-2"
                                        disabled={candidature.statut === statut.id}
                                      >
                                        <div
                                          className="w-3 h-3 rounded-full"
                                          style={{ backgroundColor: statut.couleur }}
                                        />
                                        {statut.nom}
                                        {candidature.statut === statut.id && <Check className="h-4 w-4 ml-auto" />}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingCard>
                    )
                  })}
                </div>
              ) : (
                <Card className="border-primary/10">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[250px]">Poste</TableHead>
                            <TableHead>Entreprise</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Localisation</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCandidatures.map((candidature) => {
                            const statutInfo = getStatutInfo(candidature.statut, statuts)
                            return (
                              <TableRow key={candidature.id}>
                                <TableCell className="font-medium">
                                  <Link
                                    href={`/candidatures/${candidature.id}`}
                                    className="hover:text-primary transition-colors"
                                  >
                                    {candidature.poste}
                                  </Link>
                                </TableCell>
                                <TableCell>{candidature.entreprise}</TableCell>
                                <TableCell>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        {new Date(candidature.dateCandidature).toLocaleDateString("fr-FR")}
                                      </TooltipTrigger>
                                      <TooltipContent>Il y a {candidature.joursDepuisCandidature} jours</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-2 h-7 px-2 -ml-2"
                                      >
                                        <div
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: statutInfo.couleur }}
                                        />
                                        {statutInfo.nom}
                                        <ChevronsUpDown className="h-3 w-3 opacity-50" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                      <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                                      {statuts.map((statut) => (
                                        <DropdownMenuItem
                                          key={statut.id}
                                          className="flex items-center gap-2"
                                          disabled={candidature.statut === statut.id}
                                        >
                                          <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: statut.couleur }}
                                          />
                                          {statut.nom}
                                          {candidature.statut === statut.id && <Check className="h-4 w-4 ml-auto" />}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                                <TableCell>{candidature.localisation}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button asChild size="sm" variant="ghost">
                                      <Link href={`/candidatures/${candidature.id}`}>
                                        <Eye className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                    <Button asChild size="sm" variant="ghost">
                                      <Link href={candidature.lienOffre}>
                                        <ExternalLink className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                    {candidature.contactRH?.email && (
                                      <Button asChild size="sm" variant="ghost">
                                        <a href={getMailtoLink(candidature)}>
                                          <Mail className="h-4 w-4" />
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>


            {/* Statistiques */}
            <TabsContent value="statistiques" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <FloatingCard>
                  <DonutChart
                    data={statutsData}
                    title="Répartition par statut"
                    description="Distribution de vos candidatures par statut"
                  />
                </FloatingCard>

                <FloatingCard>
                  <BarChart
                    data={entreprisesData}
                    title="Top 5 des entreprises"
                    description="Entreprises où vous avez le plus candidaté"
                  />
                </FloatingCard>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <FloatingCard>
                  <LineChart
                    data={evolutionData}
                    title="Évolution mensuelle"
                    description="Nombre de candidatures par mois"
                  />
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Taux de conversion</CardTitle>
                      <CardDescription>Progression dans le processus de recrutement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-center">
                        <ProgressRing percentage={tauxReussite} color="#10B981" label="Taux de réussite" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Candidatures envoyées</span>
                          <span className="font-medium">{stats.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Réponses reçues</span>
                          <span className="font-medium">{stats.total - stats.sansReponse}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Entretiens obtenus</span>
                          <span className="font-medium">{stats.entretiens}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Offres reçues</span>
                          <span className="font-medium">{stats.acceptees}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Analyse temporelle</CardTitle>
                      <CardDescription>Temps de réponse moyen des entreprises</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">12</div>
                        <div className="text-sm text-muted-foreground">jours en moyenne</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Réponse la plus rapide</span>
                          <span className="font-medium">2 jours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Réponse la plus lente</span>
                          <span className="font-medium">26 jours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Sans réponse (&gt;21j)</span>
                          <span className="font-medium">{stats.sansReponse}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>

              {/* Insights et recommandations */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Insights et recommandations
                    </CardTitle>
                    <CardDescription>Analyses basées sur vos données de candidature</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="font-medium text-green-800">Point fort</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Excellent taux de conversion en entretien (
                          {Math.round((stats.entretiens / stats.total) * 100)}%). Votre profil semble bien correspondre
                          aux postes visés.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="font-medium text-blue-800">Recommandation</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          {stats.sansReponse > 0 &&
                            `${stats.sansReponse} candidature(s) sans réponse depuis plus de 21 jours. 
                          Considérez une relance ou concentrez-vous sur de nouvelles opportunités.`}
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          <span className="font-medium text-orange-800">Opportunité</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          Vous avez candidaté principalement chez {entreprisesData[0]?.label}. Diversifiez vos
                          candidatures pour augmenter vos chances.
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span className="font-medium text-purple-800">Tendance</span>
                        </div>
                        <p className="text-sm text-purple-700">
                          Augmentation de 25% des candidatures ce mois-ci. Maintenez cette dynamique pour maximiser vos
                          opportunités.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            </TabsContent>

            {/* Entretiens */}
            <TabsContent value="entretiens" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Mes Entretiens</h2>
                <Button asChild>
                  <Link href="/candidatures/entretiens">
                    <Calendar className="ml-2 h-4 w-4" />
                    Gérer mes entretiens
                  </Link>
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Entretiens à venir
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {entretiens
                        .filter((e) => new Date(e.date) > new Date())
                        .slice(0, 3)
                        .map((entretien) => {
                          const candidature = candidatures.find((c) => c.id === entretien.candidatureId)
                          const joursRestants = Math.ceil(
                            (new Date(entretien.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          )

                          return (
                            <div key={entretien.id} className="p-3 border border-primary/10 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-sm">{candidature?.poste || "Entretien"}</h4>
                                <Badge variant="outline" className="text-xs">
                                  Dans {joursRestants} jour(s)
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{candidature?.entreprise}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(entretien.date).toLocaleDateString("fr-FR")} à {entretien.heure}
                              </div>
                            </div>
                          )
                        })}
                      {entretiens.filter((e) => new Date(e.date) > new Date()).length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">Aucun entretien planifié</p>
                      )}
                    </CardContent>
                  </Card>
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Entretiens récents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {entretiens
                        .filter((e) => new Date(e.date) <= new Date())
                        .slice(0, 3)
                        .map((entretien) => {
                          const candidature = candidatures.find((c) => c.id === entretien.candidatureId)

                          return (
                            <div key={entretien.id} className="p-3 border border-primary/10 rounded-lg opacity-75">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-sm">{candidature?.poste || "Entretien"}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  Terminé
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{candidature?.entreprise}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(entretien.date).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          )
                        })}
                      {entretiens.filter((e) => new Date(e.date) <= new Date()).length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">Aucun entretien passé</p>
                      )}
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>
            </TabsContent>

            {/* Tableau de bord */}
            <TabsContent value="tableau" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Évolution des candidatures
                      </CardTitle>
                      <CardDescription>Suivi de vos candidatures par mois</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm font-medium">Janvier 2024</span>
                          <span className="text-lg font-bold text-primary">8 candidatures</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">Décembre 2023</span>
                          <span className="text-lg font-bold text-muted-foreground">2 candidatures</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Prochaines actions</CardTitle>
                      <CardDescription>Ce que vous devez faire</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {stats.sansReponse > 0 && (
                        <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">Relance recommandée</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {stats.sansReponse} candidature(s) sans réponse depuis plus de 21 jours
                          </p>
                        </div>
                      )}
                      {stats.entretiens > 0 && (
                        <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Entretiens à préparer</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {stats.entretiens} entretien(s) prévu(s) ou en attente de retour
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Centre de notifications
                    </CardTitle>
                    <CardDescription>Gérez vos alertes et rappels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-primary/10 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">Rappel de relance</h4>
                          <p className="text-sm text-muted-foreground">Après 14 jours sans réponse</p>
                        </div>
                        <Badge variant="default" className="bg-primary/10 text-primary">
                          Activé
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-primary/10 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">Notification entretien</h4>
                          <p className="text-sm text-muted-foreground">Quand un entretien est confirmé</p>
                        </div>
                        <Badge variant="default" className="bg-primary/10 text-primary">
                          Activé
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-muted-foreground/20 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">Rapport hebdomadaire</h4>
                          <p className="text-sm text-muted-foreground">Résumé de vos candidatures</p>
                        </div>
                        <Badge variant="outline">Désactivé</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
