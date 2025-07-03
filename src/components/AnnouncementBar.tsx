'use client'

export default function AnnouncementBar() {
  return (
    <div className="w-full h-10 bg-primary overflow-hidden relative z-50 opacity-95">
      <div className="absolute w-max animate-marquee flex items-center h-full">
        <p className="font-bold text-sm sm:text-base text-transparent text-white bg-clip-text animate-shine px-4">
          🚀 Coaching carrière : nouvelles sessions ouvertes ! • 🎯 Formation freelance disponible ! • 💬 Rejoins notre communauté dès aujourd’hui !
        </p>
      </div>
    </div>
  )
}
