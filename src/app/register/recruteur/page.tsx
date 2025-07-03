"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { FloatingCard } from "@/components/3d-animations"

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-20 flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                Inscription Premium
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">Rejoignez ArtiVisio</h1>
              <p className="text-muted-foreground">Créez votre compte et accédez aux services premium</p>
            </div>

            <FloatingCard>
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle>Créer un compte</CardTitle>
                  <CardDescription>Remplissez vos informations pour commencer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        Prénom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="firstName"
                          placeholder="Prénom"
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Nom
                      </label>
                      <Input id="lastName" placeholder="Nom" className="border-primary/20 focus:border-primary" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email professionnel
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@entreprise.com"
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-foreground mb-2">
                      Poste actuel
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="position"
                        placeholder="Ex: Senior Manager"
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                      Années d'expérience
                    </label>
                    <Select>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Sélectionnez votre expérience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 ans</SelectItem>
                        <SelectItem value="3-5">3-5 ans</SelectItem>
                        <SelectItem value="6-10">6-10 ans</SelectItem>
                        <SelectItem value="11-15">11-15 ans</SelectItem>
                        <SelectItem value="15+">15+ ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" className="mt-1" required />
                    <span className="text-muted-foreground">
                      J'accepte les{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>
                    </span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Créer mon compte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Déjà membre ?{" "}
                    <Link href="/auth/login" className="text-primary hover:underline font-medium">
                      Se connecter
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </div>
      </section>
    </div>
  )
}
