import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, X } from "lucide-react"
import {SiLinkedin } from "react-icons/si"
import {SiX} from "react-icons/si"
import {SiFacebook} from "react-icons/si"
import {SiTelegram} from "react-icons/si"
import {SiInstagram} from "react-icons/si"

export function Footer() {
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
                <span className="text-primary-foreground/80 text-sm">contact@artivisio.com</span>
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
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} ArtiVisio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
