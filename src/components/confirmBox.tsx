"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ConfirmSwitchButton() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const isDashboard = pathname.startsWith("/dashboard")
  const targetPath = isDashboard ? "/recruteur" : "/dashboard"
  const buttonLabel = isDashboard ? "Espace recruteur" : "Espace candidat"

  const handleConfirm = () => {
    setIsLoading(false)
    setTimeout(() => {
      router.push(targetPath)
    }, 500) // délai léger pour que le spinner soit visible (optionnel)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-primary text-white">{buttonLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>

      {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-20 w-20 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Redirection en cours...</p>
          </div>
        ) : (
          <>

        <AlertDialogHeader>
          <AlertDialogTitle>Changer d’espace utilisateur</AlertDialogTitle>
          <AlertDialogDescription>
            Confirmez-vous vouloir passer à l’{buttonLabel} ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleConfirm} disabled={isLoading}>
              Continuer
            </Button>
          </AlertDialogAction>
              </AlertDialogFooter>
        </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}


