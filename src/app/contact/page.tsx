"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Calendar, MessageSquare } from "lucide-react"
import { FloatingCard, PulsingElement } from "@/components/3d-animations"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const services = [
    "Coaching Exécutif",
    "Orientation Carrière",
    "Préparation Entretiens",
    "Personal Branding",
    "Transition Professionnelle",
    "Leadership Development",
    "Recherche d'Opportunités",
    "Autre",
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "contact@artivisio.com",
      description: "Réponse sous 24h",
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: "+225 01 02 03 04 05",
      description: "Lun-Ven 9h-18h",
    },
    {
      icon: MapPin,
      title: "Bureaux",
      details: "Abidjan & Ouagadougou",
      description: "Sur rendez-vous",
    },
    {
      icon: Calendar,
      title: "Consultation",
      details: "Diagnostic gratuit 30min",
      description: "Réservation en ligne",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10 flex-1 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <PulsingElement>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </PulsingElement>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Message envoyé avec succès !</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Merci pour votre intérêt. Notre équipe vous contactera dans les 24 heures pour discuter de vos objectifs
                professionnels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="/">Retour à l'accueil</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                  <a href="/coaching">Découvrir nos services</a>
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Contact Premium
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Parlons de votre <span className="text-primary">avenir professionnel</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Échangeons sur vos ambitions et découvrons comment ArtiVisio peut vous accompagner vers l'excellence
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <FloatingCard>
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    Demande de consultation
                  </CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour une consultation personnalisée avec nos experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Votre nom complet"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email professionnel *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="votre.email@entreprise.com"
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+225 XX XX XX XX XX"
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Service souhaité *
                      </label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Décrivez vos objectifs professionnels et comment nous pouvons vous aider..."
                        rows={5}
                        required
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer ma demande
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FloatingCard>

            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Nos coordonnées</h2>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <FloatingCard key={index}>
                      <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <info.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                              <p className="text-primary font-medium mb-1">{info.details}</p>
                              <p className="text-sm text-muted-foreground">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </FloatingCard>
                  ))}
                </div>
              </div>

              {/* Horaires */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horaires de consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lundi - Vendredi</span>
                      <span className="font-medium">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samedi</span>
                      <span className="font-medium">9h00 - 14h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        Consultations d'urgence disponibles sur rendez-vous
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* FAQ rapide */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle>Questions fréquentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Combien coûte une consultation ?</h4>
                      <p className="text-sm text-muted-foreground">
                        La première consultation de 30 minutes est gratuite et sans engagement.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Proposez-vous des consultations à distance ?</h4>
                      <p className="text-sm text-muted-foreground">
                        Oui, nous proposons des consultations par visioconférence pour plus de flexibilité.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Dans quels délais puis-je avoir un rendez-vous ?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Généralement sous 48h pour une consultation d'urgence, 1 semaine pour un rendez-vous standard.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre carrière ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez les centaines de professionnels qui ont fait confiance à ArtiVisio pour atteindre leurs objectifs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button  asChild size="lg" variant="secondary" className="text-lg px-8">
              <a href="/coaching">Découvrir nos services</a>
            </Button>
            <Button               asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 text-secondary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
              <a href="/dashboard">Espace membre</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
