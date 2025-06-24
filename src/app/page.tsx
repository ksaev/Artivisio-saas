import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  FloatingCard,
  RotatingIcon,
  PulsingElement,
} from "@/components/3d-animations";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function HomePage() {
  const premiumServices = [
    {
      icon: Target,
      title: "Executive Coaching",
      description:
        "Accompagnement personnalisé pour dirigeants et cadres supérieurs",
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
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <FloatingCard className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="/home.png"
            alt="Coaching professionnel premium"
            fill
            priority
            className="object-cover w-full h-full opacity-80"
          />
        </FloatingCard>

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-no-repeat bg-cover opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative text-white">
          <div className="grid lg:grid-cols-2 gap-y-12 gap-x-20 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Sculptez votre <span className="text-primary">carrière d'exception</span> avec ArtiVisio
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                Coaching premium, opportunités exclusives et accompagnement personnalisé pour les professionnels d'élite en Afrique de l'Ouest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  <Link href="/coaching">Coaching Premium <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/20 bg-white text-black hover:bg-white/10">
                  <Link href="/offres">Opportunités Exclusives</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 pt-6">
                {[
                  { value: "500+", label: "Accompagnement" },
                  { value: "98%", label: "Taux de réussite" },
                  { value: "5+", label: "Pays couverts" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-white/70">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-primary/20">Services Premium</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Excellence sur mesure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des services d'exception conçus pour les professionnels ambitieux
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
              <Link href="/coaching">Découvrir tous nos services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
