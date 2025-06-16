import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Users, Heart, Award, TrendingUp, Globe, Import } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import React from "react"


export const metadata: Metadata = {
  title: "À propos - CareerBoost | Notre Mission et Nos Valeurs",
  description:
    "Découvrez l'histoire de CareerBoost, notre mission d'accompagner les professionnels africains et nos valeurs fondamentales.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque accompagnement pour garantir votre réussite professionnelle.",
    },
    {
      icon: Heart,
      title: "Bienveillance",
      description: "Un accompagnement humain et personnalisé, dans le respect de vos aspirations et contraintes.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous croyons en la force du collectif et des échanges pour enrichir votre parcours.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Nous adoptons les meilleures pratiques et outils pour vous offrir un service moderne.",
    },
  ]

  const team = [
    {
      name: "Dr. Aminata Koné",
      role: "Fondatrice & Coach Senior",
      location: "Abidjan, CI",
      experience: "15 ans d'expérience en RH",
      description: "Experte en développement de carrière et orientation professionnelle.",
    },
    {
      name: "Ibrahim Sawadogo",
      role: "Coach Carrière",
      location: "Ouagadougou, BF",
      experience: "10 ans en conseil RH",
      description: "Spécialiste en transition professionnelle et reconversion.",
    },
    {
      name: "Fatou Diallo",
      role: "Consultante Emploi",
      location: "Dakar, SN",
      experience: "8 ans en recrutement",
      description: "Experte en matching candidat-entreprise et négociation salariale.",
    },
  ]

  const stats = [
    { number: "1000+", label: "Professionnels accompagnés" },
    { number: "500+", label: "Offres d'emploi publiées" },
    { number: "95%", label: "Taux de satisfaction" },
    { number: "3", label: "Pays couverts" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              À propos de nous
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Notre mission : <span className="text-primary">Révéler votre potentiel</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Depuis 2020, CareerBoost accompagne les professionnels d'Afrique de l'Ouest dans leur développement de
              carrière et les connecte aux meilleures opportunités d'emploi.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Notre Histoire
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Une vision née de l'expérience</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  CareerBoost est né de la conviction que chaque professionnel mérite un accompagnement de qualité pour
                  développer sa carrière. Fondée par des experts RH ayant évolué dans les plus grandes entreprises
                  d'Afrique de l'Ouest, notre plateforme répond aux défis spécifiques du marché de l'emploi africain.
                </p>
                <p>
                  Nous avons constaté un manque d'accompagnement personnalisé et de visibilité sur les opportunités de
                  qualité. C'est pourquoi nous avons créé un écosystème complet alliant coaching expert et plateforme
                  d'emploi ciblée.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'avoir accompagné plus de 1000 professionnels vers la réussite et de
                  continuer à grandir avec notre communauté.
                </p>
              </div>
            </div>
            <div className="relative flex h-auto justify-center items-center perspective-1000">
              <Image
                src="a_propos.png"
                alt="Notre équipe"
                width={380}
                height={480}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Nos Valeurs
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ce qui nous guide au quotidien</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos valeurs fondamentales orientent chacune de nos actions et interactions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre impact en chiffres</h2>
            <p className="text-xl opacity-90">Des résultats concrets qui témoignent de notre engagement</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Notre Équipe
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Des experts à votre service</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée et expérimentée, dédiée à votre réussite professionnelle
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 bg-primary from-primary text-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    {member.location}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    {member.experience}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Prêt à commencer votre transformation ?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté et bénéficiez de l'expertise de nos coachs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button  asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/coaching">Découvrir nos services</Link>
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
