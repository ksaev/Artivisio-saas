"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, Briefcase, ArrowRight, PhoneCall, Earth } from "lucide-react"
import Link from "next/link"
import { FloatingCard } from "@/components/3d-animations"
import PhoneInputWithoutCountrySelect from 'react-phone-number-input'
//@ts-ignore
import countryList from 'react-select-country-list';
import { useState, useMemo } from "react"
import ReactSelect from 'react-select' 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


export default function RegisterPage() {

    const [phone, setPhone] = useState<string | undefined>()
    const [pays, setPays] = useState<{ label: string; value: string } | null>(null);
    const paysOptions = useMemo(() => countryList().getData(), []);


  return (
    <div className="flex flex-col min-h-screen bg-inherit bg-gradient-to-tl via-primary from-primary/5 to-accent/10">
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-10 flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 text-white">Rejoignez ArtiVisio</h1>
              <p className="text-muted-foreground text-white">Créez votre profil et accédez à nos services personnalisés</p>
            </div>

            <FloatingCard>
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle>Complétez vos informations</CardTitle>
                  <CardDescription>Quelques détails pour bien démarrer</CardDescription>
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
                        Email de contact secondaire (optionnel)
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
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Pays
                    </label>
                    <ReactSelect
                        options={paysOptions}
                        value={pays}
                        onChange={setPays}
                        placeholder="Sélectionnez un pays"
                        isClearable
                        className="w-full border-primary/20 focus:border-primary" 
                    />
                  </div>
                  
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Numéro de téléphone
                    </label>
                    <PhoneInput
                        country={'ci'} // pays par défaut : Côte d’Ivoire
                        value={phone}
                        onChange={setPhone}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                        }}
                        inputStyle={{
                            paddingLeft: "2.5rem",
                            border: "1px solid rgba(139, 69, 19, 0.2)", // remplace selon ta couleur
                            outline: "none",
                            borderRadius: "0.5rem", // optionnel : arrondi type rounded-md
                            width: "100%",
                          }}
                        />
                    </div>


                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-foreground mb-2">
                        Poste actuel
                    </label>
                    <Select>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Sélectionnez votre statut actuel" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="sans_emploi">Sans emploi</SelectItem>
                        <SelectItem value="etudiant">Étudiant(e)</SelectItem>
                        <SelectItem value="freelance">Freelance / Indépendant(e)</SelectItem>
                        <SelectItem value="stagiaire">Stagiaire</SelectItem>
                        <SelectItem value="employe">Employé(e)</SelectItem>
                        <SelectItem value="technicien">Technicien(ne)</SelectItem>
                        <SelectItem value="cadre">Cadre</SelectItem>
                        <SelectItem value="manager">Manager / Chef d'équipe</SelectItem>
                        <SelectItem value="directeur">Directeur(trice)</SelectItem>
                        <SelectItem value="entrepreneur">Entrepreneur / Fondateur(trice)</SelectItem>
                        <SelectItem value="reconversion">En reconversion</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>
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
                  

                  {/* Comment avez-vous connu ArtiVisio ? */}
                  <div>
                    <label htmlFor="source" className="block text-sm font-medium text-foreground mb-2">
                      Comment avez-vous entendu parler de nous ?
                    </label>
                    <Select>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Choisissez une source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reseaux">Réseaux sociaux</SelectItem>
                        <SelectItem value="moteur_recherche">Google / Moteur de recherche</SelectItem>
                        <SelectItem value="bouche_a_oreille">Bouche à oreille</SelectItem>
                        <SelectItem value="partenaire">Partenaire / Événement</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" className="mt-1" required />
                    <span className="text-muted-foreground">
                      J'accepte les{" "}
                      <Link href="/conditions"  target="_blank" rel="noopener noreferrer"  className="text-primary hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link href="/politique"  target="_blank" rel="noopener noreferrer"  className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>
                    </span>
                  </div>
                  <div>       
                    <Link href="/dashboard">
                        <Button className="w-full bg-primary hover:bg-primary/90 top-8">
                            Finaliser mon inscription
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
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
