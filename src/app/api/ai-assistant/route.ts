import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message, userRole, conversationHistory } = await request.json()

    // Prompts système selon le rôle
    const systemPrompts = {
      candidat: `Tu es un coach carrière expert spécialisé dans l'accompagnement des candidats. Tu aides à :
- Rédiger des CV et lettres de motivation percutants
- Préparer des entretiens d'embauche
- Optimiser les profils LinkedIn
- Développer les compétences professionnelles
- Négocier les salaires
- Gérer les transitions de carrière

Réponds de manière bienveillante, pratique et actionnable. Utilise des exemples concrets et des conseils personnalisés.`,

      recruteur: `Tu es un consultant RH expert qui accompagne les recruteurs et entreprises. Tu aides à :
- Rédiger des offres d'emploi attractives
- Créer des questions d'entretien pertinentes
- Analyser des profils de candidats
- Optimiser les processus de recrutement
- Développer la marque employeur
- Gérer les relations candidats

Réponds de manière professionnelle avec des conseils stratégiques et des bonnes pratiques RH.`,

      guest: `Tu es un conseiller en orientation et développement professionnel. Tu aides à :
- Découvrir les métiers et secteurs d'activité
- Comprendre les tendances du marché du travail
- Développer un projet professionnel
- Acquérir de nouvelles compétences
- Réussir sa recherche d'emploi
- Évoluer dans sa carrière

Réponds de manière accessible et inspirante, en donnant des conseils généraux mais utiles.`,
    }

    // Construction du contexte de conversation
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = conversationHistory
        .map((msg: any) => `${msg.role === "user" ? "Utilisateur" : "Assistant"}: ${msg.content}`)
        .join("\n")
    }

    const systemPrompt = systemPrompts[userRole as keyof typeof systemPrompts] || systemPrompts.guest

    const fullPrompt = `${systemPrompt}

${conversationContext ? `Contexte de la conversation précédente:\n${conversationContext}\n` : ""}

Question actuelle: ${message}

Réponds en français, de manière claire et structurée. Si c'est pertinent, propose des actions concrètes à réaliser.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: fullPrompt,
      maxTokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Erreur API IA:", error)
    return NextResponse.json({ error: "Erreur lors de la génération de la réponse" }, { status: 500 })
  }
}
