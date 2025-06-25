import LastUpdateDate from "@/components/lastUpdateDate"

export default function PolitiquePage() {
  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Politique de Confidentialité
          </h1>
          <LastUpdateDate />
        </header>

        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <div>
            <h3 className="text-xl font-bold mb-1">1. Données collectées</h3>
            <p>
              Nom, prénom, email, téléphone, secteur d’activité, offres consultées, messages, et toute information utile au coaching ou au recrutement.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">2. Utilisation des données</h3>
            <p>
              Vos données sont utilisées pour vous fournir nos services, améliorer votre expérience, vous notifier des offres ou rendez-vous, et assurer le bon fonctionnement de la plateforme.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">3. Partage des données</h3>
            <p>
              Nous ne partageons pas vos données avec des tiers sans consentement explicite, sauf pour répondre à des obligations légales ou techniques.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">4. Sécurité</h3>
            <p>
              Vos données sont stockées de manière sécurisée sur des serveurs protégés. Des audits réguliers sont effectués pour garantir leur confidentialité.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">5. Vos droits</h3>
            <p>
              Vous pouvez à tout moment demander à consulter, corriger ou supprimer vos données via :
              <a
                href="mailto:contact@artivisio.com"
                className="text-primary font-medium underline ml-1"
              >contact@artivisio.com</a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">6. Données des candidats</h3>
            <p>
              Vos informations de candidature sont visibles uniquement des recruteurs sur les offres que vous choisissez. Vous pouvez modifier ou retirer votre dossier à tout moment.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">7. Données des recruteurs</h3>
            <p>
              Les comptes recruteurs sont protégés et les informations liées aux campagnes ou aux entretiens ne sont jamais partagées sans consentement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
