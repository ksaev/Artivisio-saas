import LastUpdateDate from "@/components/lastUpdateDate"
import React from "react";

export default function MentionsLegalesPage() {
  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Mentions Légales
          </h1>
          <LastUpdateDate />
        </header>

        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <div>
            <h3 className="text-xl font-bold mb-1">1. Éditeur du site</h3>
            <p>
              Le site <strong>ArtiPro</strong> est édité par la société <strong>Artivisio SARL</strong>, immatriculée au Registre du Commerce sous le numéro [à compléter], dont le siège social est situé à [adresse complète].
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">2. Responsable de publication</h3>
            <p>
              Directeur de la publication : [Nom du responsable]<br />
              Contact : [email de contact]
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">3. Hébergement</h3>
            <p>
              Le site est hébergé par : <br />
              <strong>[Nom de l’hébergeur]</strong><br />
              Adresse : [adresse complète de l’hébergeur]<br />
              Téléphone : [numéro] – Site web : [url]
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">4. Propriété intellectuelle</h3>
            <p>
              L’ensemble des éléments du site (textes, images, graphismes, logo, etc.) est protégé par le droit d’auteur. Toute reproduction ou représentation sans autorisation est interdite.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">5. Données personnelles</h3>
            <p>
              Les données personnelles collectées via le site sont traitées dans le respect de la réglementation en vigueur. Pour en savoir plus, veuillez consulter notre <a href="/politique" className="text-primary underline">Politique de confidentialité</a>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">6. Cookies</h3>
            <p>
              Le site utilise des cookies à des fins de fonctionnement, de statistiques ou de personnalisation. Pour plus de détails, consultez notre <a href="/cookies" className="text-primary underline">Politique de cookies</a>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">7. Contact</h3>
            <p>
              Pour toute question ou réclamation, vous pouvez nous contacter à l’adresse suivante : <br />
              <strong>[email de contact]</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
