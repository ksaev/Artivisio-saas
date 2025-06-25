import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, X } from "lucide-react"
import {SiLinkedin } from "react-icons/si"
import {SiX} from "react-icons/si"
import {SiFacebook} from "react-icons/si"
import {SiTelegram} from "react-icons/si"
import { SiInstagram } from "react-icons/si"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from 'react-hot-toast'
import { Toaster } from "react-hot-toast"


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function Footer() {

  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return toast.error("Veuillez entrer votre adresse e-mail.")
  
    const promise = fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
  
    toast.promise(promise, {
      loading: "Envoi en cours...",
      success: () => {
        setEmail("")
        return (
      <div className="relative pr-2 pt-2 justify-center items-center">
        <div>
          <span className="justify-center items-center">
            🎉 Merci pour votre inscription <strong>{email}</strong> !<br />
            Vous recevrez bientôt nos nouveautés.
          </span>
        </div>
        <br />
        <div className="absolute bottom-2 p-1 left-0 h-2 w-full bg-blue-500 animate-toastbar rounded-full" />
      </div>

        )
      },
      error: "Une erreur est survenue. Veuillez réessayer.",
    })
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20 transform transition-transform group-hover:rotate-12">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ArtiVisio</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              Votre partenaire premium pour une carrière d'exception en Afrique de l'Ouest. Coaching personnalisé et
              opportunités d'emploi de prestige.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors transform hover:scale-110"
              >
                <SiFacebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors transform hover:scale-110"
              >
                <SiX className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors transform hover:scale-110"
              >
                <SiLinkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors transform hover:scale-110"
              >
                <SiInstagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/coaching"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/offres"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Offres d'emploi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services Premium</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/coaching"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Coaching Exécutif
                </Link>
              </li>
              <li>
                <Link
                  href="/coaching"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Orientation Stratégique
                </Link>
              </li>
              <li>
                <Link
                  href="/coaching"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Leadership Development
                </Link>
              </li>
              <li>
                <Link
                  href="/coaching"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Personal Branding
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Espace Membre VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-accent" />
              <a
                href="mailto:contact@artivisio.com"
                className="text-primary-foreground/80 text-sm hover:underline"
              >
                contact@artivisio.com
              </a>
            </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">+225 07 58 98 80 04</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Abidjan, Côte d'Ivoire
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <p className="text-white text-center md:text-left">
              © {new Date().getFullYear()} ArtiVisio. Tous droits réservés.
            </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <Link href="/mentions" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Mention légale 
                </Link>
              
                <Link href="/politique" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Politique de confidentialité
                </Link>

                <Link href="/conditions" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Conditions d'utilisation
                </Link>
              
                <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Politique de cookies
                </Link>

              </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        aria-label="Revenir en haut"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-6 w-6" />
      </Button>


    </footer>
  )
}
