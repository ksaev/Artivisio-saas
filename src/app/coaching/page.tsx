import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Target,
  Users,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Briefcase,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coaching Carrière - Services d'Accompagnement Professionnel | CareerBoost",
  description:
    "Services de coaching carrière personnalisés : orientation professionnelle, préparation entretiens, rédaction CV, développement de compétences.",
}

export default function CoachingPage() {
  const services = [
    {
      icon: Target,
      title: "Orientation Carrière",
      description: "Définissez votre projet professionnel et identifiez les opportunités qui vous correspondent",
      features: [
        "Bilan de compétences approfondi",
        "Identification de vos motivations",
        "Cartographie des opportunités",
        "Plan d'action personnalisé",
      ],
      duration: "4-6 séances",
      price: "150k FCFA",
    },
    {
      icon: FileText,
      title: "Optimisation CV & LinkedIn",
      description: "Créez des outils de candidature percutants qui mettent en valeur votre profil",
      features: [
        "Refonte complète de votre CV",
        "Optimisation profil LinkedIn",
        "Lettre de motivation type",
        "Portfolio professionnel",
      ],
      duration: "2-3 séances",
      price: "75k FCFA",
    },
    {
      icon: MessageSquare,
      title: "Préparation Entretiens",
      description: "Maîtrisez l'art de l'entretien et maximisez vos chances de décrocher le poste",
      features: [
        "Simulation d'entretiens",
        "Techniques de communication",
        "Gestion du stress",
        "Négociation salariale",
      ],
      duration: "3-4 séances",
      price: "100k FCFA",
    },
    {
      icon: TrendingUp,
      title: "Développement Leadership",
      description: "Développez vos compétences de leader et accélérez votre évolution professionnelle",
      features: ["Assessment 360°", "Plan de développement", "Coaching en situation", "Suivi personnalisé"],
      duration: "6-8 séances",
      price: "200k FCFA",
    },
    {
      icon: Users,
      title: "Transition Professionnelle",
      description: "Réussissez votre reconversion ou changement de secteur en toute sérénité",
      features: [
        "Analyse de faisabilité",
        "Stratégie de transition",
        "Développement réseau",
        "Accompagnement changement",
      ],
      duration: "8-10 séances",
      price: "250k FCFA",
    },
    {
      icon: Briefcase,
      title: "Lancement Freelance",
      description: "Lancez votre activité de freelance avec les bonnes bases et stratégies",
      features: ["Business plan freelance", "Stratégie tarifaire", "Prospection clients", "Outils et processus"],
      duration: "5-6 séances",
      price: "175k FCFA",
    },
  ]

  const coachingProcess = [
    {
      step: "1",
      title: "Diagnostic Initial",
      description: "Évaluation de votre situation actuelle et définition de vos objectifs",
    },
    {
      step: "2",
      title: "Plan Personnalisé",
      description: "Création d'un programme sur mesure adapté à vos besoins spécifiques",
    },
    {
      step: "3",
      title: "Accompagnement",
      description: "Séances de coaching individuelles avec exercices pratiques et outils",
    },
    {
      step: "4",
      title: "Suivi & Ajustement",
      description: "Évaluation des progrès et ajustement du plan selon vos avancées",
    },
  ]

  const testimonials = [
    {
      name: "Marie-Claire Kouassi",
      role: "Chef de Projet IT",
      company: "Orange CI",
      content:
        "Grâce au coaching, j'ai obtenu une promotion en 6 mois et augmenté mon salaire de 35%. L'accompagnement était parfaitement adapté à mes besoins.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Seydou Traoré",
      role: "Consultant Indépendant",
      company: "Freelance",
      content:
        "Le programme de lancement freelance m'a permis de structurer mon activité. Je génère maintenant 3x plus de revenus qu'en salariat.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Aïcha Diallo",
      role: "Directrice Marketing",
      company: "Ecobank",
      content:
        "La préparation aux entretiens a été décisive. J'ai décroché le poste de mes rêves dès le premier entretien grâce aux techniques apprises.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const faqs = [
    {
      question: "Combien de temps dure un programme de coaching ?",
      answer:
        "La durée varie selon vos objectifs : de 2-3 séances pour l'optimisation CV à 8-10 séances pour une transition complète. Chaque programme est personnalisé.",
    },
    {
      question: "Les séances se déroulent-elles en présentiel ou à distance ?",
      answer:
        "Nous proposons les deux formats. Les séances à distance via visioconférence sont aussi efficaces et permettent plus de flexibilité.",
    },
    {
      question: "Proposez-vous des tarifs préférentiels ?",
      answer:
        "Oui, nous avons des tarifs étudiants (-30%) et des packages multi-services avec remises. Contactez-nous pour connaître nos offres actuelles.",
    },
    {
      question: "Comment choisir le bon programme de coaching ?",
      answer:
        "Nous commençons toujours par un entretien diagnostic gratuit de 30 minutes pour identifier vos besoins et vous orienter vers le programme le plus adapté.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Coaching Professionnel
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Accélérez votre
                  <span className="text-primary"> carrière</span> avec nos experts
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bénéficiez d'un accompagnement personnalisé par des coachs certifiés pour atteindre vos objectifs
                  professionnels plus rapidement.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/contact">
                    Réserver un diagnostic gratuit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="#services">Découvrir nos services</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Professionnels accompagnés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Satisfaction client</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/coaching.png"
                alt="Coaching professionnel"
                width={680}
                height={780}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services de Coaching */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Nos Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Un accompagnement sur mesure pour chaque étape
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez le programme qui correspond à vos objectifs professionnels
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </div>
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                    <Button className="w-full">Choisir ce programme</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processus de Coaching */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Notre Méthode
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comment se déroule votre coaching ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche structurée et personnalisée pour maximiser vos résultats
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coachingProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Témoignages
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ils ont transformé leur carrière</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez les success stories de nos clients</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Prêt à donner un nouvel élan à votre carrière ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Réservez votre diagnostic gratuit de 30 minutes avec l'un de nos experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button  asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/contact">Réserver mon diagnostic gratuit</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 text-secondary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              <Link href="/auth/login">Créer mon compte</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
