// Simulation d'une base de données partagée
export interface Candidat {
  id: string
  nom: string
  email: string
  telephone?: string
  cv?: string
  message: string
  dateCandidature: string
  offreId: string
  statut: string
  poste : string
  entreprise: string
}

export interface Entretien {
  id: string
  candidatureId: string
  candidatId: string
  recruteurId: string
  offreId: string
  date: string
  heure: string
  lieu?: string
  lien?: string
  type: "presentiel" | "visio" | "telephonique"
  message?: string
  statut: "planifie" | "confirme" | "reporte" | "annule" | "termine"
  creePar: "candidat" | "recruteur"
  dateCreation: string
}

export interface Offre {
  id: string
  titre: string
  entreprise: string
  description: string
  localisation: string
  salaire?: string
  typeContrat: string
  datePublication: string
  recruteurId: string
  statut: "active" | "fermee" | "pourvue"
}

export interface Recruteur {
  id: string
  nom: string
  email: string
  entreprise: string
  poste: string
}

// Données simulées
export const offres: Offre[] = [
  {
    id: "offre_1",
    titre: "Chief Technology Officer",
    entreprise: "FinTech Innovations CI",
    description: "Diriger la transformation digitale d'une fintech en pleine croissance",
    localisation: "Abidjan, CI",
    salaire: "Négociable + Equity",
    typeContrat: "CDI",
    datePublication: "2024-01-10",
    recruteurId: "rec_1",
    statut: "active",
  },
  {
    id: "offre_2",
    titre: "VP Strategy & Operations",
    entreprise: "Investment Group SN",
    description: "Superviser les opérations financières d'un groupe d'investissement",
    localisation: "Dakar, SN",
    salaire: "Package premium",
    typeContrat: "CDI",
    datePublication: "2024-01-08",
    recruteurId: "rec_2",
    statut: "active",
  },
  {
    id: "offre_3",
    titre: "Senior Strategy Consultant",
    entreprise: "McKinsey & Company BF",
    description: "Accompagner nos clients dans leurs transformations stratégiques",
    localisation: "Ouagadougou, BF",
    salaire: "Très attractif",
    typeContrat: "Consulting",
    datePublication: "2024-01-05",
    recruteurId: "rec_3",
    statut: "active",
  },
]

export const candidatures: Candidat[] = [
  {
    id: "cand_1",
    nom: "Jean Kouassi",
    email: "jean.kouassi@email.com",
    telephone: "+225 07 08 09 10 11",
    cv: "CV_Jean_Kouassi.pdf",
    message: "Bonjour, je suis très intéressé par ce poste de CTO. Mon expérience de 10 ans dans le secteur fintech...",
    dateCandidature: "2024-01-15",
    offreId: "offre_1",
    statut: "nouveau",
    poste : "INFORMATICIEN",
    entreprise : "KS+ INNOV'DIGITAL",
  },
  {
    id: "cand_2",
    nom: "Marie Diallo",
    email: "marie.diallo@email.com",
    telephone: "+221 77 123 45 67",
    cv: "CV_Marie_Diallo.pdf",
    message: "Madame, Monsieur, Forte de mes 8 années d'expérience en stratégie...",
    dateCandidature: "2024-01-12",
    offreId: "offre_2",
    statut: "en_cours",
    poste : "INFORMATICIEN",
    entreprise : "KS+ INNOV'DIGITAL",
  },
  {
    id: "cand_3",
    nom: "Ibrahim Sawadogo",
    email: "ibrahim.sawadogo@email.com",
    telephone: "+226 70 12 34 56",
    cv: "CV_Ibrahim_Sawadogo.pdf",
    message: "Bonjour, consultant senior avec 12 ans d'expérience chez Big4...",
    dateCandidature: "2024-01-10",
    offreId: "offre_3",
    statut: "entretien_planifie",
    poste : "INFORMATICIEN",
    entreprise : "KS+ INNOV'DIGITAL",
  },
  {
    id: "cand_4",
    nom: "Aminata Koné",
    email: "aminata.kone@email.com",
    telephone: "+225 05 67 89 01",
    cv: "CV_Aminata_Kone.pdf",
    message: "Madame, Monsieur, Diplômée d'HEC Paris avec 6 ans d'expérience...",
    dateCandidature: "2024-01-14",
    offreId: "offre_1",
    statut: "nouveau",
    poste : "INFORMATICIEN",
    entreprise : "KS+ INNOV'DIGITAL",
  },
]

export const entretiens: Entretien[] = [
  {
    id: "ent_1",
    candidatureId: "cand_3", // ✅ corriger ici
    candidatId: "cand_3",
    recruteurId: "rec_3",
    offreId: "offre_3",
    date: "2024-01-25",
    heure: "14:00",
    lien: "https://meet.google.com/abc-defg-hij",
    type: "visio",
    message:
      "Entretien avec l'équipe de direction. Merci de préparer une présentation de 10 minutes sur votre vision stratégique.",
    statut: "planifie",
    creePar: "recruteur",
    dateCreation: "2024-01-18",
  },
  {
    id: "ent_2",
    candidatureId: "cand_3", // ✅ même ici
    candidatId: "cand_3",
    recruteurId: "rec_3",
    offreId: "offre_3",
    date: "2024-01-22",
    heure: "10:00",
    lieu: "Bureau McKinsey, Ouagadougou",
    type: "presentiel",
    message: "Premier entretien avec le Partner. Durée prévue : 1h30.",
    statut: "termine",
    creePar: "recruteur",
    dateCreation: "2024-01-15",
  },
]


export const recruteurs: Recruteur[] = [
  {
    id: "rec_1",
    nom: "Sarah Kouassi",
    email: "s.kouassi@fintech-innovations.ci",
    entreprise: "FinTech Innovations CI",
    poste: "Head of Talent Acquisition",
  },
  {
    id: "rec_2",
    nom: "Mamadou Ba",
    email: "m.ba@investment-group.sn",
    entreprise: "Investment Group SN",
    poste: "HR Director",
  },
  {
    id: "rec_3",
    nom: "Dr. Fatou Ouedraogo",
    email: "f.ouedraogo@mckinsey.com",
    entreprise: "McKinsey & Company BF",
    poste: "Senior Partner",
  },
]

// Fonctions utilitaires
export const getCandidatsByOffre = (offreId: string): Candidat[] => {
  return candidatures.filter((candidat) => candidat.offreId === offreId)
}

export const getEntretiensByCandidature = (candidatureId: string): Entretien[] => {
  return entretiens.filter((entretien) => entretien.candidatureId === candidatureId)
}

export const getOffresByRecruteur = (recruteurId: string): Offre[] => {
  return offres.filter((offre) => offre.recruteurId === recruteurId)
}

export const getEntretiensByRecruteur = (recruteurId: string): Entretien[] => {
  return entretiens.filter((entretien) => entretien.recruteurId === recruteurId)
}
