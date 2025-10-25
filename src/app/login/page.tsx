"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/app/logo";

export default function LoginPage() {
  const router = useRouter();

  const handleDemoSignIn = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
      backgroundSize: '2rem 2rem'
    }}>
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Sistema de Gestión</CardTitle>
          <CardDescription>
            Acceda al panel de control para gestionar la información académica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={handleDemoSignIn} className="w-full">
                Acceder (Modo Demo)
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              La autenticación real se configurará más adelante.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
