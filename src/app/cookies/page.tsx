export default function CookiesPage() {
    return (
      <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 text-center">
            Politique de Cookies
          </h1>
  
          <div className="space-y-6 text-base leading-relaxed text-gray-700">
            <p>
              Notre site utilise des cookies afin d'améliorer votre expérience, analyser le trafic et proposer des services personnalisés.
            </p>
  
            <h2 className="text-xl font-semibold">Qu’est-ce qu’un cookie ?</h2>
            <p>
              Un cookie est un petit fichier stocké sur votre appareil lorsque vous visitez un site web. Il permet de collecter des informations sur votre navigation.
            </p>
  
            <h2 className="text-xl font-semibold">Types de cookies utilisés</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Cookies fonctionnels :</strong> essentiels au bon fonctionnement du site.</li>
              <li><strong>Cookies analytiques :</strong> utilisés pour suivre l’utilisation du site (ex. : Google Analytics).</li>
              <li><strong>Cookies marketing :</strong> pour personnaliser les publicités si activés.</li>
            </ul>
  
            <h2 className="text-xl font-semibold">Votre consentement</h2>
            <p>
              Lors de votre première visite, une bannière s’affiche pour obtenir votre consentement. Vous pouvez modifier vos préférences à tout moment.
            </p>
  
            <h2 className="text-xl font-semibold">Désactiver les cookies</h2>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait altérer certaines fonctionnalités du site.
            </p>
  
            <p>
              Pour toute question, contactez-nous à :{" "}
              <a href="mailto:contact@artivisio.com" className="text-primary underline font-medium">
                contact@artivisio.com
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }
  