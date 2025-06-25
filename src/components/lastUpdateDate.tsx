import React from "react"

export default function LastUpdateDate() {

    const lastUpdate = "24 juin 2025" // À modifier manuellement quand nécessaire
  
    return (
      <p className="text-lg text-gray-600">
        Dernière mise à jour : <span className="font-medium">{lastUpdate}</span>
      </p>
    )
  }
  