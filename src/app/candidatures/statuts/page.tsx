"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import { FloatingCard } from "@/components/3d-animations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types pour les statuts
interface Statut {
  id: string;
  nom: string;
  couleur: string;
  description: string;
  ordre: number;
  type: "system" | "custom";
}

// Statuts par défaut du système
const defaultStatuts: Statut[] = [
  {
    id: "postule",
    nom: "Postulé",
    couleur: "#FBBF24", // Jaune
    description: "Candidature envoyée, en attente de réponse",
    ordre: 1,
    type: "system",
  },
  {
    id: "entretien",
    nom: "Entretien prévu",
    couleur: "#34D399", // Vert
    description: "Un entretien a été programmé",
    ordre: 2,
    type: "system",
  },
  {
    id: "entretien_passe",
    nom: "Entretien passé",
    couleur: "#60A5FA", // Bleu
    description: "L'entretien a eu lieu, en attente de retour",
    ordre: 3,
    type: "system",
  },
  {
    id: "relance",
    nom: "Relance effectuée",
    couleur: "#A78BFA", // Violet
    description: "Une relance a été envoyée",
    ordre: 4,
    type: "system",
  },
  {
    id: "refus",
    nom: "Refusé",
    couleur: "#EF4444", // Rouge
    description: "Candidature refusée par l'entreprise",
    ordre: 5,
    type: "system",
  },
  {
    id: "accepte",
    nom: "Accepté",
    couleur: "#10B981", // Vert foncé
    description: "Candidature acceptée, offre reçue",
    ordre: 6,
    type: "system",
  },
  {
    id: "sans_reponse",
    nom: "Sans réponse",
    couleur: "#9CA3AF", // Gris
    description: "Aucune réponse après un certain temps",
    ordre: 7,
    type: "system",
  },
];

export default function StatutsPage() {
  const [statuts, setStatuts] = useState<Statut[]>([...defaultStatuts]);
  const [customStatuts, setCustomStatuts] = useState<Statut[]>([]);
  const [editingStatut, setEditingStatut] = useState<Statut | null>(null);
  const [newStatut, setNewStatut] = useState<
    Omit<Statut, "id" | "ordre" | "type">
  >({
    nom: "",
    couleur: "#6366F1", // Indigo par défaut
    description: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Simuler le chargement des statuts personnalisés depuis une API
  useEffect(() => {
    // Dans une vraie application, cela viendrait d'une API
    const savedCustomStatuts: Statut[] = [
      {
        id: "custom_1",
        nom: "Deuxième entretien",
        couleur: "#8B5CF6",
        description: "Convoqué pour un deuxième entretien",
        ordre: 8,
        type: "custom",
      },
      {
        id: "custom_2",
        nom: "Test technique",
        couleur: "#EC4899",
        description: "Test technique à réaliser",
        ordre: 9,
        type: "custom",
      },
    ];

    setCustomStatuts(savedCustomStatuts);
    setStatuts([...defaultStatuts, ...savedCustomStatuts]);
  }, []);

  const handleAddStatut = () => {
    if (newStatut.nom.trim() === "") return;

    const newId = `custom_${Date.now()}`;
    const statutToAdd: Statut = {
      ...newStatut,
      id: newId,
      ordre: statuts.length + 1,
      type: "custom",
    };

    setCustomStatuts([...customStatuts, statutToAdd]);
    setStatuts([...statuts, statutToAdd]);
    setNewStatut({
      nom: "",
      couleur: "#6366F1",
      description: "",
    });
    setShowDialog(false);
  };

  const handleUpdateStatut = () => {
    if (!editingStatut || editingStatut.nom.trim() === "") return;

    const updatedStatuts = statuts.map((s) =>
      s.id === editingStatut.id ? editingStatut : s
    );
    const updatedCustomStatuts = customStatuts.map((s) =>
      s.id === editingStatut.id ? editingStatut : s
    );

    setStatuts(updatedStatuts);
    setCustomStatuts(updatedCustomStatuts);
    setEditingStatut(null);
    setShowDialog(false);
  };

  const handleDeleteStatut = (id: string) => {
    const updatedStatuts = statuts.filter((s) => s.id !== id);
    const updatedCustomStatuts = customStatuts.filter((s) => s.id !== id);

    // Réorganiser les ordres
    const reorderedStatuts = updatedStatuts.map((s, index) => ({
      ...s,
      ordre: index + 1,
    }));

    setStatuts(reorderedStatuts);
    setCustomStatuts(updatedCustomStatuts);
  };

  const moveStatut = (id: string, direction: "up" | "down") => {
    const index = statuts.findIndex((s) => s.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === statuts.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newStatuts = [...statuts];
    const temp = newStatuts[index];
    newStatuts[index] = newStatuts[newIndex];
    newStatuts[newIndex] = temp;

    // Mettre à jour les ordres
    const reorderedStatuts = newStatuts.map((s, idx) => ({
      ...s,
      ordre: idx + 1,
    }));
    setStatuts(reorderedStatuts);

    // Mettre à jour les statuts personnalisés si nécessaire
    if (temp.type === "custom" || newStatuts[index].type === "custom") {
      const updatedCustomStatuts = customStatuts.map(
        (s) => reorderedStatuts.find((rs) => rs.id === s.id) || s
      );
      setCustomStatuts(updatedCustomStatuts);
    }
  };

  const handleSaveChanges = () => {
    // Simuler la sauvegarde vers une API
    console.log("Saving statuts:", { defaultStatuts, customStatuts });

    // Afficher le message de succès
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const colorOptions = [
    { name: "Rouge", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Jaune", value: "#FBBF24" },
    { name: "Vert", value: "#34D399" },
    { name: "Vert foncé", value: "#10B981" },
    { name: "Bleu", value: "#60A5FA" },
    { name: "Bleu foncé", value: "#3B82F6" },
    { name: "Violet", value: "#A78BFA" },
    { name: "Violet foncé", value: "#8B5CF6" },
    { name: "Rose", value: "#EC4899" },
    { name: "Gris", value: "#9CA3AF" },
    { name: "Noir", value: "#1F2937" },
    { name: "Bleu nuit", value: "#0F172A" },
    { name: "Vert émeraude", value: "#059669" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Gris bleuté", value: "#64748B" },
    { name: "Bleu pastel", value: "#BFDBFE" },
    { name: "Vert pastel", value: "#D1FAE5" },
    { name: "Jaune pastel", value: "#FEF3C7" },
    { name: "Rose pastel", value: "#FCE7F3" },
    { name: "Rouille", value: "#B45309" },
    { name: "Sable", value: "#FCD34D" },
    { name: "Olive", value: "#4D7C0F" },
    { name: "Menthe", value: "#6EE7B7" },
    { name: "Cyan", value: "#22D3EE" },
    { name: "Turquoise", value: "#14B8A6" },
    { name: "Bleu acier", value: "#2563EB" },
    { name: "Bleu glacier", value: "#93C5FD" },
    { name: "Lavande", value: "#C4B5FD" },
    { name: "Aubergine", value: "#7C3AED" },
    { name: "Magenta", value: "#DB2777" },
    { name: "Carmin", value: "#BE123C" },
    { name: "Cuivre", value: "#D97706" },
    { name: "Brun cacao", value: "#78350F" },
    { name: "Pêche", value: "#FCA5A5" },
    { name: "Citron vert", value: "#84CC16" },
    { name: "Bleu minéral", value: "#0EA5E9" },
    { name: "Gris pierre", value: "#6B7280" },
    { name: "Gris chaud", value: "#A8A29E" },
    { name: "Sarcelle", value: "#0D9488" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/candidatures">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux candidatures
              </Link>
            </Button>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 bg-primary/10 text-primary border-primary/20"
              >
                Personnalisation
              </Badge>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2 sm:text-2xl">
                Gérer les <span className="text-primary">statuts</span> de
                candidature
              </h1>
              <p className="text-muted-foreground">
                Personnalisez les statuts pour suivre vos candidatures selon vos
                besoins
              </p>
            </div>
            <div className="flex gap-2">
              {saveSuccess && (
                <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 py-2 px-3">
                  <Check className="h-4 w-4" /> Modifications enregistrées
                </Badge>
              )}
              <Button
                onClick={handleSaveChanges}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Tous les statuts</TabsTrigger>
                <TabsTrigger value="system">Statuts système</TabsTrigger>
                <TabsTrigger value="custom">Statuts personnalisés</TabsTrigger>
              </TabsList>

              {/* Tous les statuts */}
              <TabsContent value="all" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Tous les statuts ({statuts.length})
                  </h2>
                  <Dialog
                    open={showDialog && !editingStatut}
                    onOpenChange={(open) => {
                      setShowDialog(open);
                      if (!open) setEditingStatut(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un statut
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un nouveau statut</DialogTitle>
                        <DialogDescription>
                          Créez un statut personnalisé pour suivre vos
                          candidatures
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom">Nom du statut</Label>
                          <Input
                            id="nom"
                            value={newStatut.nom}
                            onChange={(e) =>
                              setNewStatut({
                                ...newStatut,
                                nom: e.target.value,
                              })
                            }
                            placeholder="Ex: Entretien technique"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            value={newStatut.description}
                            onChange={(e) =>
                              setNewStatut({
                                ...newStatut,
                                description: e.target.value,
                              })
                            }
                            placeholder="Ex: Entretien technique avec l'équipe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Couleur</Label>
                          <div className="flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                              <div
                                key={color.value}
                                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                                  newStatut.couleur === color.value
                                    ? "border-black dark:border-white"
                                    : "border-transparent"
                                }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() =>
                                  setNewStatut({
                                    ...newStatut,
                                    couleur: color.value,
                                  })
                                }
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowDialog(false)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleAddStatut}>Ajouter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={!!editingStatut}
                    onOpenChange={(open) => {
                      if (!open) setEditingStatut(null);
                    }}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier le statut</DialogTitle>
                        <DialogDescription>
                          Modifiez les détails de ce statut personnalisé
                        </DialogDescription>
                      </DialogHeader>
                      {editingStatut && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-nom">Nom du statut</Label>
                            <Input
                              id="edit-nom"
                              value={editingStatut.nom}
                              onChange={(e) =>
                                setEditingStatut({
                                  ...editingStatut,
                                  nom: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">
                              Description
                            </Label>
                            <Input
                              id="edit-description"
                              value={editingStatut.description}
                              onChange={(e) =>
                                setEditingStatut({
                                  ...editingStatut,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Couleur</Label>
                            <div className="flex flex-wrap gap-2">
                              {colorOptions.map((color) => (
                                <div
                                  key={color.value}
                                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                                    editingStatut.couleur === color.value
                                      ? "border-black dark:border-white"
                                      : "border-transparent"
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                  onClick={() =>
                                    setEditingStatut({
                                      ...editingStatut,
                                      couleur: color.value,
                                    })
                                  }
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setEditingStatut(null)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleUpdateStatut}>
                          Enregistrer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {statuts
                    .sort((a, b) => a.ordre - b.ordre)
                    .map((statut) => (
                      <FloatingCard key={statut.id}>
                        <Card className="border-primary/10">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-6 h-6 rounded-full"
                                  style={{ backgroundColor: statut.couleur }}
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">
                                      {statut.nom}
                                    </h3>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {statut.type === "system"
                                        ? "Système"
                                        : "Personnalisé"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {statut.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveStatut(statut.id, "up")}
                                    disabled={statut.ordre === 1}
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      moveStatut(statut.id, "down")
                                    }
                                    disabled={statut.ordre === statuts.length}
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                </div>
                                {statut.type === "custom" && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setEditingStatut(statut)}
                                    >
                                      Modifier
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteStatut(statut.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingCard>
                    ))}
                </div>
              </TabsContent>

              {/* Statuts système */}
              <TabsContent value="system" className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Statuts système ({defaultStatuts.length})
                </h2>
                <div className="space-y-4">
                  {defaultStatuts
                    .sort((a, b) => a.ordre - b.ordre)
                    .map((statut) => (
                      <FloatingCard key={statut.id}>
                        <Card className="border-primary/10">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-6 h-6 rounded-full"
                                  style={{ backgroundColor: statut.couleur }}
                                />
                                <div>
                                  <h3 className="font-semibold">
                                    {statut.nom}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {statut.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveStatut(statut.id, "up")}
                                    disabled={statut.ordre === 1}
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      moveStatut(statut.id, "down")
                                    }
                                    disabled={statut.ordre === statuts.length}
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingCard>
                    ))}
                </div>
              </TabsContent>

              {/* Statuts personnalisés */}
              <TabsContent value="custom" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Statuts personnalisés ({customStatuts.length})
                  </h2>
                  <Dialog
                    open={showDialog && !editingStatut}
                    onOpenChange={(open) => {
                      setShowDialog(open);
                      if (!open) setEditingStatut(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un statut
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un nouveau statut</DialogTitle>
                        <DialogDescription>
                          Créez un statut personnalisé pour suivre vos
                          candidatures
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom">Nom du statut</Label>
                          <Input
                            id="nom"
                            value={newStatut.nom}
                            onChange={(e) =>
                              setNewStatut({
                                ...newStatut,
                                nom: e.target.value,
                              })
                            }
                            placeholder="Ex: Entretien technique"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            value={newStatut.description}
                            onChange={(e) =>
                              setNewStatut({
                                ...newStatut,
                                description: e.target.value,
                              })
                            }
                            placeholder="Ex: Entretien technique avec l'équipe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Couleur</Label>
                          <div className="flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                              <div
                                key={color.value}
                                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                                  newStatut.couleur === color.value
                                    ? "border-black dark:border-white"
                                    : "border-transparent"
                                }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() =>
                                  setNewStatut({
                                    ...newStatut,
                                    couleur: color.value,
                                  })
                                }
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowDialog(false)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleAddStatut}>Ajouter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {customStatuts.length === 0 ? (
                  <Card className="border-primary/10">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        Vous n'avez pas encore créé de statuts personnalisés.
                      </p>
                      <Button onClick={() => setShowDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Créer mon premier statut
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {customStatuts
                      .sort((a, b) => a.ordre - b.ordre)
                      .map((statut) => (
                        <FloatingCard key={statut.id}>
                          <Card className="border-primary/10">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-6 h-6 rounded-full"
                                    style={{ backgroundColor: statut.couleur }}
                                  />
                                  <div>
                                    <h3 className="font-semibold">
                                      {statut.nom}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {statut.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        moveStatut(statut.id, "up")
                                      }
                                      disabled={statut.ordre === 1}
                                    >
                                      <ArrowUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        moveStatut(statut.id, "down")
                                      }
                                      disabled={statut.ordre === statuts.length}
                                    >
                                      <ArrowDown className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingStatut(statut)}
                                  >
                                    Modifier
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteStatut(statut.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </FloatingCard>
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
