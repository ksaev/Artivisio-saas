"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Search, Filter, MapPin, Building, Clock, Star } from "lucide-react"
import Link from "next/link"
import { FloatingCard } from "@/components/3d-animations"

const jobs = [
  {
    id: 1,
    title: "Chief Technology Officer",
    company: "FinTech Innovations CI",
    location: "Abidjan, Côte d'Ivoire",
    type: "C-Level",
    domain: "Technology",
    level: "Executive",
    description: "Diriger la transformation digitale d'une fintech en pleine croissance",
    salary: "Négociable + Equity",
    posted: "2 jours",
    featured: true,
    slug: "cto-fintech-innovations-ci",
  },
  {
    id: 2,
    title: "Senior Strategy Consultant",
    company: "McKinsey & Company BF",
    location: "Ouagadougou, Burkina Faso",
    type: "Consulting",
    domain: "Strategy",
    level: "Senior",
    description: "Accompagner les grandes entreprises dans leur transformation stratégique",
    salary: "Très attractif",
    posted: "1 semaine",
    featured: true,
    slug: "senior-strategy-consultant-bf",
  },
  {
    id: 3,
    title: "VP Finance & Operations",
    company: "Investment Group SN",
    location: "Dakar, Sénégal",
    type: "Executive",
    domain: "Finance",
    level: "VP Level",
    description: "Superviser les opérations financières d'un groupe d'investissement",
    salary: "Package premium",
    posted: "3 jours",
    featured: false,
    slug: "vp-finance-operations-sn",
  },
  {
    id: 4,
    title: "Directeur Marketing & Brand",
    company: "Luxury Brands Africa",
    location: "Abidjan, Côte d'Ivoire",
    type: "Direction",
    domain: "Marketing",
    level: "Director",
    description: "Développer la stratégie marketing pour des marques de luxe en Afrique",
    salary: "Excellent package",
    posted: "5 jours",
    featured: false,
    slug: "directeur-marketing-brand-ci",
  },
  {
    id: 5,
    title: "Head of Digital Transformation",
    company: "Banking Group",
    location: "Lomé, Togo",
    type: "Leadership",
    domain: "Digital",
    level: "Head",
    description: "Piloter la transformation digitale d'un groupe bancaire régional",
    salary: "Très compétitif",
    posted: "1 semaine",
    featured: false,
    slug: "head-digital-transformation-tg",
  },
  {
    id: 6,
    title: "Senior Legal Counsel",
    company: "International Law Firm",
    location: "Cotonou, Bénin",
    type: "Legal",
    domain: "Juridique",
    level: "Senior",
    description: "Conseiller juridique senior pour cabinet international",
    salary: "Package attractif",
    posted: "4 jours",
    featured: false,
    slug: "senior-legal-counsel-bj",
  },
]

const countries = ["Tous les pays", "Côte d'Ivoire", "Burkina Faso", "Sénégal", "Togo", "Bénin", "Mali", "Niger"]
const domains = [
  "Tous les domaines",
  "Technology",
  "Finance",
  "Strategy",
  "Marketing",
  "Digital",
  "Juridique",
  "Operations",
]
const levels = ["Tous les niveaux", "C-Level", "VP Level", "Director", "Head", "Senior", "Executive"]

export default function OffresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("Tous les pays")
  const [selectedDomain, setSelectedDomain] = useState("Tous les domaines")
  const [selectedLevel, setSelectedLevel] = useState("Tous les niveaux")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = selectedCountry === "Tous les pays" || job.location.includes(selectedCountry)
    const matchesDomain = selectedDomain === "Tous les domaines" || job.domain === selectedDomain
    const matchesLevel = selectedLevel === "Tous les niveaux" || job.level === selectedLevel

    return matchesSearch && matchesCountry && matchesDomain && matchesLevel
  })

  const featuredJobs = filteredJobs.filter((job) => job.featured)
  const regularJobs = filteredJobs.filter((job) => !job.featured)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Opportunités Premium
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Postes d'<span className="text-primary">exception</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les opportunités de carrière les plus prestigieuses en Afrique de l'Ouest
            </p>
          </div>

          {/* Filtres */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
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
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger className="border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Offres en vedette */}
      {featuredJobs.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Opportunités en vedette</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <FloatingCard key={job.id}>
                  <Card className="hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                      PREMIUM
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="border-accent/30 text-accent-foreground">
                          {job.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-primary">{job.salary}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {job.posted}
                        </div>
                      </div>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href={`/offres/${job.slug}`}>Voir l'opportunité</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Toutes les offres */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Toutes les opportunités ({filteredJobs.length})</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filtres actifs
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune opportunité trouvée</h3>
                <p className="text-muted-foreground">
                  Essayez de modifier vos critères de recherche pour voir plus d'offres.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularJobs.map((job) => (
                <FloatingCard key={job.id}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-secondary/10 text-secondary-foreground border-secondary/20"
                        >
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="border-muted-foreground/20">
                          {job.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-primary">{job.salary}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {job.posted}
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                        <Link href={`/offres/${job.slug}`}>Voir les détails</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </FloatingCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas l'opportunité idéale ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Nos experts peuvent vous accompagner dans votre recherche et vous présenter des opportunités exclusives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button  asChild size="lg" variant="secondary" className="text-lg px-8">
          <Link href="/coaching">Coaching personnalisé</Link>
            </Button>
            <Button               
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 text-secondary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
