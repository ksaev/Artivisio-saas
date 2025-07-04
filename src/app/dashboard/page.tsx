"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Briefcase,
  Heart,
  Bell,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { FloatingCard, PulsingElement } from "@/components/3d-animations";
import {
  BarChart,
  DonutChart,
  LineChart,
  MetricCard,
  ProgressRing,
} from "@/components/charts";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { spawn } from "node:child_process";

export default function DashboardPage() {
  const [activeGoals, setActiveGoals] = useState(3);
  const [completedSessions, setCompletedSessions] = useState(8);

  // Utilisateur par défaut
  const { isLoaded, user } = useUser();

  const favoriteJobs = [
    {
      id: 1,
      title: "Chief Technology Officer",
      company: "FinTech Innovations CI",
      location: "Abidjan, CI",
      type: "C-Level",
      saved: "2 jours",
      status: "Candidature envoyée",
    },
    {
      id: 2,
      title: "VP Strategy & Operations",
      company: "Investment Group",
      location: "Dakar, SN",
      type: "Executive",
      saved: "1 semaine",
      status: "En attente",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      type: "Coaching Exécutif",
      coach: "Dr. Aminata Koné",
      date: "Demain",
      time: "14h00",
      duration: "60 min",
    },
    {
      id: 2,
      type: "Préparation Entretien",
      coach: "Ibrahim Sawadogo",
      date: "Vendredi",
      time: "10h00",
      duration: "45 min",
    },
  ];

  const achievements = [
    {
      title: "Premier Coaching Complété",
      description: "Félicitations pour votre première séance !",
      icon: Award,
      unlocked: true,
    },
    {
      title: "Profil Optimisé",
      description: "CV et LinkedIn mis à jour",
      icon: User,
      unlocked: true,
    },
    {
      title: "Objectifs Définis",
      description: "3 objectifs professionnels établis",
      icon: Target,
      unlocked: false,
    },
  ];

  const careerProgress = {
    currentLevel: "Senior Manager",
    targetLevel: "Director",
    progress: 65,
    nextMilestone: "Développer leadership skills",
  };

  // Données pour les graphiques
  const candidaturesData = [
    { label: "Postulé", value: 5, color: "#FBBF24" },
    { label: "Entretien", value: 3, color: "#34D399" },
    { label: "Refusé", value: 2, color: "#EF4444" },
    { label: "Accepté", value: 1, color: "#10B981" },
  ];

  const activiteData = [
    { label: "Lun", value: 2, date: "2024-01-15" },
    { label: "Mar", value: 1, date: "2024-01-16" },
    { label: "Mer", value: 3, date: "2024-01-17" },
    { label: "Jeu", value: 0, date: "2024-01-18" },
    { label: "Ven", value: 2, date: "2024-01-19" },
    { label: "Sam", value: 1, date: "2024-01-20" },
    { label: "Dim", value: 0, date: "2024-01-21" },
  ];

  const competencesData = [
    { label: "Leadership", value: 85, color: "#3B82F6" },
    { label: "Communication", value: 92, color: "#10B981" },
    { label: "Stratégie", value: 78, color: "#F59E0B" },
    { label: "Innovation", value: 88, color: "#8B5CF6" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Dashboard */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 sm:text-3xl">
                Bonjour
                {!isLoaded ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground " />
                ) : (
                  <span className="text-primary ">
                    {" "}
                    {user?.firstName || "Membre"} !👋
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground">
                Continuons à construire votre carrière d'exception
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 mb-2 pb-8 lg:w-fit sm:grid-cols-5 ">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
              <TabsTrigger value="jobs">Mes Offres</TabsTrigger>
              <TabsTrigger value="coaching">Coaching</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
            </TabsList>

            {/* Vue d'ensemble */}
            <TabsContent value="overview" className="space-y-8">
              {/* Métriques principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Candidatures actives"
                  value={favoriteJobs.length}
                  change={{
                    value: 15,
                    type: "increase",
                    period: "cette semaine",
                  }}
                  icon={<Briefcase className="h-6 w-6" />}
                  color="#3B82F6"
                />
                <MetricCard
                  title="Sessions complétées"
                  value={completedSessions}
                  change={{ value: 25, type: "increase", period: "ce mois" }}
                  icon={<Calendar className="h-6 w-6" />}
                  color="#10B981"
                />
                <MetricCard
                  title="Objectifs actifs"
                  value={activeGoals}
                  change={{ value: 0, type: "neutral", period: "stable" }}
                  icon={<Target className="h-6 w-6" />}
                  color="#F59E0B"
                />
                <MetricCard
                  title="Progression carrière"
                  value={`${careerProgress.progress}%`}
                  change={{ value: 8, type: "increase", period: "ce mois" }}
                  icon={<TrendingUp className="h-6 w-6" />}
                  color="#8B5CF6"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Progression Carrière */}
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Progression Carrière
                      </CardTitle>
                      <CardDescription>
                        Votre évolution vers {careerProgress.targetLevel}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        <ProgressRing
                          percentage={careerProgress.progress}
                          color="#3B82F6"
                          label="Progression"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{careerProgress.currentLevel}</span>
                          <span>{careerProgress.targetLevel}</span>
                        </div>
                        <Progress
                          value={careerProgress.progress}
                          className="h-2"
                        />
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">
                          Prochaine étape :
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {careerProgress.nextMilestone}
                        </p>
                      </div>
                      <Button asChild className="w-full">
                        <Link href="/coaching">Planifier une session</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </FloatingCard>

                {/* Prochaines Sessions */}
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Prochaines Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div
                          key={session.id}
                          className="p-3 border border-primary/10 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">
                              {session.type}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {session.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Avec {session.coach}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {session.date} à {session.time}
                          </div>
                        </div>
                      ))}
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/coaching">Voir toutes les sessions</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>

              {/* Achievements */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Accomplissements
                    </CardTitle>
                    <CardDescription>
                      Vos réussites et jalons atteints
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.unlocked
                              ? "border-primary/20 bg-primary/5"
                              : "border-muted-foreground/20 bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <achievement.icon
                              className={`h-5 w-5 ${
                                achievement.unlocked
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            {achievement.unlocked && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <h4 className="font-medium text-sm mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            </TabsContent>

            {/* Analytiques */}
            <TabsContent value="analytics" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <FloatingCard>
                  <DonutChart
                    data={candidaturesData}
                    title="Statut des candidatures"
                    description="Répartition de vos candidatures par statut"
                  />
                </FloatingCard>

                <FloatingCard>
                  <BarChart
                    data={competencesData}
                    title="Évaluation des compétences"
                    description="Votre niveau dans les compétences clés"
                  />
                </FloatingCard>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <FloatingCard>
                  <LineChart
                    data={activiteData}
                    title="Activité de la semaine"
                    description="Nombre d'actions effectuées par jour"
                  />
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Performance globale
                      </CardTitle>
                      <CardDescription>
                        Votre score de performance cette semaine
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-center">
                        <ProgressRing
                          percentage={87}
                          color="#10B981"
                          label="Performance"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Candidatures envoyées</span>
                          <span className="font-medium">5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Sessions coaching</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Objectifs atteints</span>
                          <span className="font-medium">3/4</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Tendances</CardTitle>
                      <CardDescription>
                        Évolution de vos métriques
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Taux de réponse</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">78%</span>
                            <span className="text-xs text-green-600">
                              ↗ +12%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Entretiens obtenus</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">60%</span>
                            <span className="text-xs text-green-600">
                              ↗ +8%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Satisfaction coaching</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">4.9/5</span>
                            <span className="text-xs text-green-600">
                              ↗ +0.2
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>

              {/* Insights */}
              <FloatingCard>
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Insights personnalisés
                    </CardTitle>
                    <CardDescription>
                      Recommandations basées sur vos données
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="font-medium text-green-800">
                            Excellent progrès
                          </span>
                        </div>
                        <p className="text-sm text-green-700">
                          Votre taux de conversion en entretien a augmenté de
                          25% ce mois-ci. Continuez sur cette lancée !
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="font-medium text-blue-800">
                            Recommandation
                          </span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Planifiez une session de coaching sur la négociation
                          salariale pour optimiser vos futures offres.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            </TabsContent>

            {/* Mes Offres */}
            <TabsContent value="jobs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">
                  Mes Offres Sauvegardées
                </h2>
                <Button asChild>
                  <Link href="/offres-user">
                    Parcourir les offres
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {favoriteJobs.map((job) => (
                  <FloatingCard key={job.id}>
                    <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="default"
                                className="bg-primary/10 text-primary border-primary/20"
                              >
                                {job.type}
                              </Badge>
                              <Badge
                                variant={
                                  job.status === "Candidature envoyée"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  job.status === "Candidature envoyée"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : ""
                                }
                              >
                                {job.status}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {job.title}
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              {job.company}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {job.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-2">
                              Sauvegardé il y a {job.saved}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button size="sm">Voir l'offre</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FloatingCard>
                ))}
              </div>
            </TabsContent>

            {/* Coaching */}
            <TabsContent value="coaching" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Mon Parcours Coaching
                </h2>
                <Button asChild>
                  <Link href="/coaching">
                    Réserver une session
                    <Calendar className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Sessions Récentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          type: "Coaching Exécutif",
                          date: "Il y a 3 jours",
                          coach: "Dr. Aminata Koné",
                          rating: 5,
                        },
                        {
                          type: "Préparation Entretien",
                          date: "Il y a 1 semaine",
                          coach: "Ibrahim Sawadogo",
                          rating: 5,
                        },
                      ].map((session, index) => (
                        <div
                          key={index}
                          className="p-3 border border-primary/10 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">
                              {session.type}
                            </h4>
                            <div className="flex">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-primary text-primary"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Avec {session.coach}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.date}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Objectifs en Cours</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          title: "Développer leadership skills",
                          progress: 75,
                          deadline: "Dans 2 semaines",
                        },
                        {
                          title: "Optimiser personal branding",
                          progress: 50,
                          deadline: "Dans 1 mois",
                        },
                        {
                          title: "Préparer transition C-Level",
                          progress: 25,
                          deadline: "Dans 3 mois",
                        },
                      ].map((goal, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{goal.title}</span>
                            <span className="text-muted-foreground">
                              {goal.progress}%
                            </span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {goal.deadline}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>
            </TabsContent>

            {/* Profil */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">
                  Mon Profil
                </h2>
                <Button variant="outline">Modifier le profil</Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <FloatingCard className="lg:col-span-2">
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Informations Professionnelles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Poste actuel
                          </label>
                          <p className="text-foreground">Senior Manager</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Entreprise
                          </label>
                          <p className="text-foreground">
                            TechCorp International
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Secteur
                          </label>
                          <p className="text-foreground">Technology</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Expérience
                          </label>
                          <p className="text-foreground">8 ans</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>

                <FloatingCard>
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Préférences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Notifications
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <Bell className="h-4 w-4 text-primary" />
                          <span className="text-sm">Activées</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Langue
                        </label>
                        <p className="text-foreground">Français</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Fuseau horaire
                        </label>
                        <p className="text-foreground">GMT+0 (Abidjan)</p>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
