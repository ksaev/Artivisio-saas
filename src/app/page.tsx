import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Briefcase, Globe, Star, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { FloatingCard, RotatingIcon, PulsingElement } from "@/components/3d-animations"
import Image from "next/image"
import { PricingTable} from "@clerk/nextjs"
import Spline from '@splinetool/react-spline/next';
export default function HomePage() {
  const featuredJobs = [
    {
      id: 1,
      title: "Directeur Technique Senior",
      company: "TechCorp Premium CI",
      location: "Abidjan, Côte d'Ivoire",
      type: "CDI Executive",
      domain: "Technology Leadership",
      level: "C-Level",
      slug: "directeur-technique-senior-ci",
    },
    {
      id: 2,
      title: "Consultant Strategy & Innovation",
      company: "McKinsey & Partners BF",
      location: "Ouagadougou, Burkina Faso",
      type: "Consulting",
      domain: "Strategy",
      level: "Senior",
      slug: "consultant-strategy-innovation-bf",
    },
    {
      id: 3,
      title: "VP Finance & Operations",
      company: "Investment Group",
      location: "Dakar, Sénégal",
      type: "Executive",
      domain: "Finance",
      level: "VP Level",
      slug: "vp-finance-operations-sn",
    },
  ]

  const premiumServices = [
    {
      icon: Target,
      title: "Executive Coaching",
      description: "Accompagnement personnalisé pour dirigeants et cadres supérieurs",
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Développez votre potentiel de leader avec nos experts certifiés",
    },
    {
      icon: TrendingUp,
      title: "Career Acceleration",
      description: "Accélérez votre progression vers les postes de direction",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/10 py-20 lg:py-32 overflow-hidden">

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <PulsingElement>
                  <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Excellence & Innovation
                  </Badge>
                </PulsingElement>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Sculptez votre
                  <span className="text-primary"> carrière d'exception</span> avec ArtiVisio
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Coaching premium, opportunités exclusives et accompagnement personnalisé pour les professionnels
                  d'élite en Afrique de l'Ouest.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  <Link href="/coaching">
                    Coaching Premium
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 border-primary/20 hover:bg-primary/5"
                >
                  <Link href="/offres">Opportunités Exclusives</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Leaders accompagnés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Taux de réussite</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">C-Level</div>
                  <div className="text-sm text-muted-foreground">Positions atteintes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <FloatingCard>
                <Image
                  src="/home.png"
                  alt="Coaching professionnel premium"
                  width={580}
                  height={680}
                  className="rounded-2xl shadow-2xl"
                />
              </FloatingCard>
  <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-background overflow-hidden"
                      >
                        <img
                          src={`/homme${i}.jpg`} 
                          alt={`image${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">+500 executives</div>
                    <div className="text-xs text-muted-foreground">nous font confiance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Premium */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/20">
              Services Premium
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Excellence sur mesure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des services d'exception conçus pour les professionnels ambitieux
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {premiumServices.map((service, index) => (
              <FloatingCard key={index} className="h-full">
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 h-full">
                  <CardHeader>
                    <RotatingIcon>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                    </RotatingIcon>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/coaching">
                Découvrir tous nos services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Opportunités Premium */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/20">
              Opportunités Exclusives
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Postes de prestige</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accédez aux meilleures opportunités de carrière en Afrique de l'Ouest
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <FloatingCard key={job.id}>
                <Card className="hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant={job.type.includes("Executive") ? "default" : "secondary"}
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="border-accent/30 text-accent-foreground">
                        {job.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="font-semibold text-primary">{job.domain}</div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href={`/offres/${job.slug}`}>Voir l'opportunité</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
              <Link href="/offres">
                Toutes les opportunités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/20">
              Success Stories
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ils ont atteint l'excellence</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Aminata Koné",
                role: "CEO & Founder",
                location: "Abidjan, CI",
                content:
                  "ArtiVisio m'a accompagnée jusqu'au poste de CEO. Un coaching d'exception qui transforme les carrières.",
                rating: 5,
              },
              {
                name: "Ibrahim Sawadogo",
                role: "Managing Director",
                location: "Ouagadougou, BF",
                content:
                  "Grâce à ArtiVisio, j'ai multiplié mes revenus par 5 et atteint le niveau de direction que je visais.",
                rating: 5,
              },
              {
                name: "Fatou Diallo",
                role: "VP Strategy",
                location: "Dakar, SN",
                content:
                  "Un accompagnement premium qui m'a menée vers les plus hautes responsabilités. Résultats exceptionnels.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <FloatingCard key={index}>
                <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-primary">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <PulsingElement>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Prêt pour l'excellence ?</h2>
          </PulsingElement>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez l'élite des professionnels qui ont choisi ArtiVisio pour transformer leur carrière
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/dashboard">Accès Membre Premium</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 text-secondary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Consultation Exclusive</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
