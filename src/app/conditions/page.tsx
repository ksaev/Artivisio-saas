
import LastUpdateDate from "@/components/lastUpdateDate"
import React from "react";

export default function ConditionsPage() {

  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Conditions Générales d’Utilisation
          </h1>
          <LastUpdateDate />
        </header>

        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <div>
            <h3 className="text-xl font-bold mb-1">1. Objet</h3>
            <p>
              Le site <strong>ArtiPro</strong> propose des services de coaching professionnel et de mise en relation avec des opportunités d’emploi en Afrique de l’Ouest.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">2. Acceptation</h3>
            <p>
              En accédant au site ou en utilisant nos services, vous acceptez intégralement les présentes conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">3. Services proposés</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Coaching personnalisé pour les professionnels et cadres</li>
              <li>Offres d’emploi premium ciblées</li>
              <li>Outils de suivi de candidatures pour les recruteurs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">4. Engagements</h3>
            <p>
              L’utilisateur s’engage à fournir des informations exactes, respecter les lois en vigueur, et ne pas compromettre la sécurité du site.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">5. Propriété intellectuelle</h3>
            <p>
              Tous les contenus sont la propriété exclusive de <strong>Artivisio SARL</strong> et ne peuvent être utilisés sans autorisation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">6. Résiliation</h3>
            <p>
              Vous pouvez demander la suppression de votre compte. En cas d’abus, ArtiPro se réserve le droit de restreindre l’accès.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">7. Utilisateurs (candidats)</h3>
            <p>
              L'utilisateur accède à un espace personnel lui permettant de gérer son coaching, ses candidatures, et son profil public.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Fournir des informations vraies et à jour</li>
              <li>Respecter la confidentialité des sessions de coaching</li>
              <li>Ne pas partager son compte ou ses accès</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">8. Recruteurs</h3>
            <p>
              Les recruteurs disposent d’un tableau de bord pour publier des offres, suivre les candidatures et organiser les entretiens.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Publier uniquement des offres sérieuses</li>
              <li>Respecter la confidentialité des données des candidats</li>
              <li>Utiliser les outils dans le respect de la réglementation en vigueur</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}