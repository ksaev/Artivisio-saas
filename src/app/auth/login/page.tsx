"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { FloatingCard } from "@/components/3d-animations"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-20 flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                Connexion Membre
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">Bon retour !</h1>
              <p className="text-muted-foreground">Accédez à votre espace membre ArtiVisio</p>
            </div>

            <FloatingCard>
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle>Connexion</CardTitle>
                  <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@exemple.com"
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
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

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Se souvenir de moi
                    </label>
                    <Link href="/auth/forgot-password" className="text-primary hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Se connecter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Pas encore membre ?{" "}
                    <Link href="/auth/register" className="text-primary hover:underline font-medium">
                      Créer un compte
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
